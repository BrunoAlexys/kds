import { apiClient } from "./api";
import type { OrderData } from "../pages/historico";

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export const OrderService = {
  getOrderHistory: async (adminId: number, page: number, size: number, search: string) => {
    return await apiClient.get<PageResponse<OrderData>>(`/orders/history/${adminId}`, {
      params: {
        page,
        size,
        search
      }
    });
  }
};