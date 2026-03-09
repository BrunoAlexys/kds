import { apiClient } from "../service/api";
import type { OrderItem } from "../store/useKitchenStore";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const KITCHEN_KEYS = {
    all: ['kitchen'] as const,
    orders: () => [...KITCHEN_KEYS.all, 'orders'] as const,
    stats: () => [...KITCHEN_KEYS.all, 'stats'] as const,
};

export const useKitchenOrders = (userId: string = '1') => {
    return useQuery({
        queryKey: KITCHEN_KEYS.orders(),
        queryFn: () => apiClient.get<OrderItem[]>(`/orders/kitchen/today/${userId}`),
        refetchOnWindowFocus: false,
    });
};

export const useKitchenStats = (userId: string = '1') => {
    return useQuery({
        queryKey: KITCHEN_KEYS.stats(),
        queryFn: () => apiClient.get<{ averageTime: number }>(`/orders/kitchen/statistics/average-time/${userId}`),
        refetchOnWindowFocus: false,
    });
};

export const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ id, status }: { id: string, status: string }) => 
            apiClient.patch(`/orders/${id}/status`, status, { 
                headers: { 'Content-Type': 'text/plain' } 
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: KITCHEN_KEYS.stats() });
        }
    });
};