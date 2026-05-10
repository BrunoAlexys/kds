import { useEffect, useRef, useMemo, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useKitchenStore } from "../store/useKitchenStore";
import { useKitchenOrders } from "../hooks/useKitchenQueries"; 
import toast from 'react-hot-toast';
import VolumeIcon from "./VolumeIcon";

const columnStyles: Record<string, { card: string; badge: string; price: string; divider: string; headerBadge: string; tableText: string; borderColor: string; }> = {
    "col-1": { 
        card: "bg-red-50 border-red-400", 
        badge: "bg-red-600 text-white", 
        price: "text-red-600", 
        divider: "border-red-200", 
        headerBadge: "bg-red-500 text-white", 
        tableText: "text-gray-600",
        borderColor: "#FF5151" // Cor exata do Card Pendentes
    },
    "col-2": { 
        card: "bg-yellow-50 border-yellow-400", 
        badge: "bg-orange-500 text-white", 
        price: "text-yellow-900", 
        divider: "border-yellow-200", 
        headerBadge: "bg-orange-500 text-white", 
        tableText: "text-yellow-900",
        borderColor: "#FC9300" // Cor exata do Card Em Preparo
    },
    "col-3": { 
        card: "bg-green-50 border-green-400", 
        badge: "bg-green-500 text-white", 
        price: "text-green-600", 
        divider: "border-green-200", 
        headerBadge: "bg-green-500 text-white", 
        tableText: "text-gray-600",
        borderColor: "#22C55E" // Cor exata do Card Pronto
    }
};

const getFormattedElapsedTime = (dateString?: string | null) => {
    if (!dateString) return "0m";
    const now = new Date();
    const finishedDate = new Date(dateString);
    const diffMs = now.getTime() - finishedDate.getTime();
    if (diffMs < 6000) return "agora mesmo";
    const diffMinutes = Math.floor(diffMs / 60000);
    if (diffMinutes < 60) return `${diffMinutes}m`;
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours}h ${minutes > 0 ? `${minutes}m` : ''}`;
};

const ReadyTimer = ({ finishedAt }: { finishedAt?: string | null }) => {
    const [timeLabel, setTimeLabel] = useState(() => getFormattedElapsedTime(finishedAt));
    useEffect(() => {
        setTimeLabel(getFormattedElapsedTime(finishedAt));
        const interval = setInterval(() => {
            setTimeLabel(getFormattedElapsedTime(finishedAt));
        }, 60000);
        return () => clearInterval(interval);
    }, [finishedAt]);

    return (
        <span className="flex items-center gap-1 text-green-600 bg-green-100 px-2 py-1 rounded-md text-[11px] font-bold tracking-tight leading-none">
            <svg className="relative top-[0.5]" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
            {timeLabel === 'agora mesmo' ? 'Pronto agora mesmo' : `Pronto há ${timeLabel}`}
        </span>
    );
};

function KitchenDisplay() {
    const { data: initialOrders, isLoading } = useKitchenOrders();

    const { columns, connectWebSocket, moveOrder, setInitialOrders } = useKitchenStore();

    const audioRef = useRef(typeof window !== 'undefined' ? new Audio('/alarm.mp3') : null);
    const [isMuted, setIsMuted] = useState(true);
    const [newOrderId, setNewOrderId] = useState<string | null>(null);

    useEffect(() => {
        if (initialOrders) {
            setInitialOrders(initialOrders);
        }
    }, [initialOrders, setInitialOrders]);

    useEffect(() => {
        connectWebSocket();
    }, [connectWebSocket]);

    const totalOrders = useMemo(() => {
        if (!columns) return 0;
        return Object.values(columns).reduce((acc, col) => acc + col.items.length, 0);
    }, [columns]);

    const prevOrdersRef = useRef(totalOrders);

    const toggleAudio = () => {
        if (!audioRef.current) return;
        const newMutedState = !isMuted;
        setIsMuted(newMutedState);

        if (!newMutedState) {
            audioRef.current.volume = 0.4;
            audioRef.current.play().then(() => {
                setTimeout(() => {
                    if (audioRef.current) {
                        audioRef.current.pause();
                        audioRef.current.currentTime = 0;
                    }
                }, 500);
            }).catch(() => { });
        }
        toast.success(newMutedState ? "Áudio desativado" : "Áudio ativado", { icon: newMutedState ? '🔕' : '🔔', duration: 2000 });
    };

    useEffect(() => {
        if (totalOrders > prevOrdersRef.current && prevOrdersRef.current > 0) {
            const firstColumn = Object.values(columns)[0];

            if (firstColumn && firstColumn.items.length > 0) {
                const latestOrder = firstColumn.items[firstColumn.items.length - 1];
                if (latestOrder) {
                    setNewOrderId(latestOrder.id);
                    setTimeout(() => setNewOrderId(null), 3000);
                }
            }

            if (!isMuted && audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(() => { });
            }
            toast.success("Novo Pedido!", { icon: '🔔', duration: 3000 });
        }
        prevOrdersRef.current = totalOrders;
    }, [totalOrders, isMuted, columns]);

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-[#F7F7F7]">
                <div className="text-gray-400 font-medium animate-pulse">Carregando pedidos...</div>
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full bg-[#F0F2F5] p-8 gap-6 overflow-hidden flex-col font-sans relative">
            <style>
                {`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-4px) rotate(-1.3deg); }
                    75% { transform: translateX(4px) rotate(1.3deg); }
                }
                .animate-shake {
                    animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
                    animation-iteration-count: 3;
                    position: relative;
                    z-index: 10;
                    backface-visibility: hidden;
                    transform-style: preserve-3d;
                }
                `}
            </style>

            <button
                onClick={toggleAudio}
                className={`fixed bottom-6 right-5 z-50 flex items-center justify-center p-3 rounded-xl transition-all duration-300 shadow-md active:scale-90 group ${isMuted ? "bg-red-100 text-red-600" : "bg-white text-gray-800 border border-gray-100"}`}
            >
                <div className="flex items-center gap-2">
                    <VolumeIcon muted={isMuted} />
                </div>
            </button>
            <div className="flex gap-20 h-full items-start justify-center w-full max-w-7xl mx-auto px-4">
                <DragDropContext onDragEnd={moveOrder}>
                    {Object.entries(columns).map(([columnId, column]) => {
                        const currentStyle = columnStyles[columnId] || columnStyles["col-1"];
                        return (
                            <div 
                                key={columnId} 
                                className="flex flex-col flex-1 min-w-0 bg-white rounded-3xl p-5 shadow-sm h-full border border-gray-100 border-t-4"
                                style={{ borderTopColor: currentStyle.borderColor }}
                            >
                                <div className="flex justify-between items-center mb-6 px-1">
                                    <h3 className="text-xl font-bold text-gray-800 tracking-tight">{column.name}</h3>
                                    <span className={`${currentStyle.headerBadge} flex items-center justify-center text-sm font-bold w-9 h-9 rounded-full shadow-sm`}>
                                        {column.items.length}
                                    </span>
                                </div>

                                <Droppable droppableId={columnId}>
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className="flex-1 overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-white"
                                        >
                                            {column.items.map((item, index) => (
                                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`p-5 mb-4 rounded-2xl border-2 transition-all duration-200 
                                                            ${currentStyle.card} 
                                                            ${snapshot.isDragging ? "shadow-2xl scale-[1.02] rotate-1 z-50" : ""}
                                                            ${newOrderId === item.id ? "animate-shake ring-4 ring-blue-400/20" : ""}
                                                        `}
                                                            style={{
                                                                ...provided.draggableProps.style,
                                                                transform: provided.draggableProps.style?.transform,
                                                            }}
                                                        >
                                                            <div className={`flex justify-between items-start mb-4 pb-3 border-b ${currentStyle.divider}`}>
                                                                <span className={`${currentStyle.badge} text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider`}>{item.orderId}</span>
                                                                <span className={`text-sm font-bold ${currentStyle.tableText}`}>{item.table}</span>
                                                            </div>
                                                            <ul className="space-y-2 mb-4">
                                                                {item.items.map((prod, i) => (
                                                                    <li key={i} className="text-gray-700 text-[14px] font-medium leading-tight flex items-center gap-2">
                                                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                                                                        {prod}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                            <div className={`flex justify-between items-center pt-3 border-t ${currentStyle.divider}`}>
                                                                {columnId === "col-3" ? (
                                                                    <ReadyTimer finishedAt={item.finishedAt} />
                                                                ) : (
                                                                    <span className="text-gray-400 text-[11px] font-bold">{item.time}</span>
                                                                )}
                                                                <strong className={`text-lg font-black ${currentStyle.price}`}>{item.total}</strong>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        );
                    })}
                </DragDropContext>
            </div>
        </div>
    );
}

export default KitchenDisplay;