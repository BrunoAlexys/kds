import { create } from 'zustand';
import { Client } from '@stomp/stompjs';
import type { DropResult } from "@hello-pangea/dnd";
import SockJS from 'sockjs-client';
import { apiClient } from '../service/api';

const notificationSound = typeof window !== 'undefined' ? new Audio('/alarm.mp3') : null;
if (notificationSound) notificationSound.volume = 0.5;

export interface OrderItem {
    id: string;
    orderId: string;
    table: string;
    items: string[];
    total: string;
    time: string;
    status?: string;
    finishedAt?: string | null;
}

interface Column {
    name: string;
    items: OrderItem[];
}

interface ColumnsState {
    [key: string]: Column;
}

interface KitchenState {
    columns: ColumnsState;
    isConnected: boolean;
    averageTime: number;
    setInitialOrders: (orders: OrderItem[]) => void;
    setAverageTime: (time: number) => void;
    connectWebSocket: () => void;
    moveOrder: (result: DropResult) => void;
    syncOrder: (order: OrderItem) => void;
    fetchAverageTime: () => Promise<void>;
}

const initialData: ColumnsState = {
    "col-1": { name: "A fazer", items: [] },
    "col-2": { name: "Fazendo", items: [] },
    "col-3": { name: "Pronto", items: [] }
};

export const useKitchenStore = create<KitchenState>((set, get) => {
    let stompClient: Client | null = null;

    return {
        columns: initialData,
        isConnected: false,
        averageTime: 0,

        setInitialOrders: (orders) => {
            const newColumns = JSON.parse(JSON.stringify(initialData));
            orders.forEach(order => {
                let columnId = 'col-1';
                if (order.status === 'DOING') columnId = 'col-2';
                if (order.status === 'DONE') columnId = 'col-3';

                if (newColumns[columnId]) {
                    newColumns[columnId].items.push(order);
                }
            });
            set({ columns: newColumns });
        },

        setAverageTime: (time) => set({ averageTime: time }),

        fetchAverageTime: async () => {
            try {
                const data = await apiClient.get<number>('/orders/kitchen/statistics/average-time/1');
                set({ averageTime: data });
            } catch (error) {
                console.error('Erro ao buscar tempo médio:', error);
            }
        },

        connectWebSocket: () => {
            if (stompClient?.active) return;
            
            const baseUrl = import.meta.env.VITE_API_BASE_URL.replace('/v1/api', '');
            const socket = new SockJS(`${baseUrl}/ws`);
            stompClient = new Client({
                webSocketFactory: () => socket,
                reconnectDelay: 5000,
                onConnect: () => {
                    set({ isConnected: true });
                    stompClient?.subscribe('/topic/orders', (message) => {
                        const newOrder: OrderItem = JSON.parse(message.body);
                        get().syncOrder(newOrder);

                        if (newOrder.status === 'DONE') {
                            get().fetchAverageTime();
                        }

                        if (newOrder.status === 'PENDING' && notificationSound) {
                            const state = get();
                            const exists = Object.values(state.columns).some(col =>
                                col.items.some(item => item.id === newOrder.id)
                            );
                            if (!exists) {
                                notificationSound.currentTime = 0;
                                notificationSound.play().catch(e => console.error(e));
                            }
                        }
                    });
                },
                onDisconnect: () => set({ isConnected: false }),
            });
            stompClient.activate();
        },

        syncOrder: (order) => {
            set((state) => {
                const newColumns = JSON.parse(JSON.stringify(state.columns));
                Object.keys(newColumns).forEach(key => {
                    newColumns[key].items = newColumns[key].items.filter((item: OrderItem) => item.id !== order.id);
                });

                let targetColumnId = 'col-1';
                if (order.status === 'DOING') targetColumnId = 'col-2';
                if (order.status === 'DONE') targetColumnId = 'col-3';

                if (newColumns[targetColumnId]) {
                    newColumns[targetColumnId].items.push(order);
                }
                return { columns: newColumns };
            });
        },

        moveOrder: async (result) => {
            const { source, destination, draggableId } = result;
            if (!destination) return;
            if (source.droppableId === destination.droppableId && source.index === destination.index) return;

            set((state) => {
                const sourceColumn = state.columns[source.droppableId];
                const destColumn = state.columns[destination.droppableId];
                const sourceItems = [...sourceColumn.items];
                const destItems = source.droppableId === destination.droppableId ? sourceItems : [...destColumn.items];
                const [removed] = sourceItems.splice(source.index, 1);

                if (destination.droppableId === 'col-3') {
                    removed.finishedAt = new Date().toISOString();
                    removed.status = 'DONE';
                } else if (destination.droppableId === 'col-2') {
                    removed.finishedAt = null;
                    removed.status = 'DOING';
                } else {
                    removed.finishedAt = null;
                    removed.status = 'PENDING';
                }

                destItems.splice(destination.index, 0, removed);

                return {
                    columns: {
                        ...state.columns,
                        [source.droppableId]: { ...sourceColumn, items: sourceItems },
                        [destination.droppableId]: { ...destColumn, items: destItems }
                    }
                }
            });

            let newStatus = 'PENDING';
            if (destination.droppableId === 'col-2') newStatus = 'DOING';
            if (destination.droppableId === 'col-3') newStatus = 'DONE';

            try {
                await apiClient.patch(
                    `/orders/${draggableId}/status`,
                    newStatus,
                    { headers: { 'Content-Type': 'text/plain' } }
                );

                if (newStatus === 'DONE') {
                    get().fetchAverageTime();
                }

            } catch (error) {
                console.error('Erro ao atualizar status do pedido:', error);
            }
        }
    };
});