import { useState, useEffect, useCallback } from "react";
import Menu from "../components/menu";
import { OrderTableRow } from "../components/historico/OrderTableRow";
import { Search } from "lucide-react";
import { Pagination } from "../components/pagination";
import { SortableHeader } from "../components/historico/SortableHeader";
import { OrderService } from "../service/order.service";

export interface OrderData {
  id: number;
  orderNumber: string;
  date: string;
  time: string;
  table: string;
  mainItems: string;
  additionalComment: string;
  totalValue: string;
  paymentMethod: "Cartão" | "Pix" | "Dinheiro";
}

type SortDirection = "asc" | "desc" | "normal";

const COLUMNS = [
  { key: "id", label: "Pedido" },
  { key: "date", label: "Data/Hora" },
  { key: "table", label: "Mesa" },
  { key: "items", label: "Itens" },
  { key: "value", label: "Valor" },
  { key: "paymentMethod", label: "Pagamento" },
];

export default function Historico() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: SortDirection }>({ key: "", direction: "normal" });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const adminId = 1; 
      
      const response = await OrderService.getOrderHistory(
        adminId, 
        currentPage - 1, 
        itemsPerPage, 
        debouncedSearchTerm
      );

      setOrders(response.content);
      setTotalItems(response.totalElements);

    } catch (error) {
      console.error("Erro ao buscar histórico de pedidos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage, debouncedSearchTerm]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        if (prev.direction === "desc") return { key: "", direction: "normal" };
      }
      return { key, direction: "asc" };
    });
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col font-sans">
      <Menu />

      <main className="flex-1 p-2.5 max-w-350 mx-auto w-full">
        <h1 className="text-4xl font-bold text-[#1C2434] mb-8">Histórico</h1>

        <div className="flex flex-col gap-6">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Busca por ID, mesa ou itens"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left relative">
                <thead className="bg-[#1C2434] text-white border-b border-[#1C2434]">
                  <tr>
                    <th className="p-4 w-12 text-center">
                      <input type="checkbox" className="accent-blue-500 rounded cursor-pointer" />
                    </th>
                    {COLUMNS.map((col) => (
                      <SortableHeader
                        key={col.key}
                        label={col.label}
                        columnKey={col.key}
                        sortConfig={sortConfig}
                        onSort={handleSort}
                      />
                    ))}
                    <th className="p-4">Ações</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {isLoading ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-gray-500">
                        Carregando pedidos...
                      </td>
                    </tr>
                  ) : orders.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-gray-500">
                        Nenhum pedido encontrado.
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <OrderTableRow key={order.id} order={order} />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <Pagination 
            currentPage={currentPage} 
            totalItems={totalItems} 
            itemsPerPage={itemsPerPage} 
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(newSize) => {
              setItemsPerPage(newSize);
              setCurrentPage(1);
            }}
          />
        </div>
      </main>
    </div>
  );
}