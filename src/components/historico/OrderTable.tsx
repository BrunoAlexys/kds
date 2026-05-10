import { OrderTableRow, type Order } from "./OrderTableRow";

interface OrderTableProps {
  orders: Order[];
}

export function OrderTable({ orders }: OrderTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-white border-b border-gray-100">
            <th className="p-4 w-12 text-center">
              <input type="checkbox" className="accent-blue-900" />
            </th>
            <th className="p-4 text-xs font-black uppercase text-gray-400 tracking-widest">Pedido</th>
            <th className="p-4 text-xs font-black uppercase text-gray-400 tracking-widest">Data/Hora</th>
            <th className="p-4 text-xs font-black uppercase text-gray-400 tracking-widest">Mesa</th>
            <th className="p-4 text-xs font-black uppercase text-gray-400 tracking-widest">Itens</th>
            <th className="p-4 text-xs font-black uppercase text-gray-400 tracking-widest">Valor</th>
            <th className="p-4 text-xs font-black uppercase text-gray-400 tracking-widest">Pagamento</th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {orders.map((order, index) => (
            <OrderTableRow key={index} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
}