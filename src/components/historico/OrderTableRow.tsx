import { Eye, Printer } from "lucide-react";

export interface Order {
  id: string;
  date: string;
  time: string;
  table: string;
  items: string;
  subItems: string;
  value: string;
  paymentMethod: "Cartão" | "Pix" | "Dinheiro";
}

interface OrderTableRowProps {
  order: Order;
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const paymentStyles = {
    Cartão: "bg-[#E8F0FE] text-[#1967D2]",
    Pix: "bg-[#E4F7F6] text-[#00857A]",
    Dinheiro: "bg-[#E6F4EA] text-[#1E8E3E]",
  };

  return (
    <tr className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
      <td className="p-4 w-12 text-center">
        <input type="checkbox" className="rounded border-gray-300 accent-blue-900" />
      </td>
      <td className="p-4 font-semibold text-gray-700">{order.id}</td>
      <td className="p-4">
        <div className="text-sm font-bold text-gray-700">{order.date}</div>
        <div className="text-xs text-gray-400">{order.time}</div>
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2 font-bold text-gray-700">
          <span className="text-gray-400">🪑</span> {order.table}
        </div>
      </td>
      <td className="p-4">
        <div className="font-bold text-gray-800">{order.items}</div>
        <div className="text-xs text-gray-400">{order.subItems}</div>
      </td>
      <td className="p-4 font-bold text-gray-800">{order.value}</td>
      <td className="p-4">
        <span className={`px-4 py-1.5 rounded-md text-xs font-bold flex items-center justify-center w-24 gap-1 ${paymentStyles[order.paymentMethod]}`}>
          {order.paymentMethod === "Pix" && <span className="text-[10px]">💠</span>}
          {order.paymentMethod === "Cartão" && <span className="text-[10px]">💳</span>}
          {order.paymentMethod === "Dinheiro" && <span className="text-[10px]">💵</span>}
          {order.paymentMethod}
        </span>
      </td>
      <td className="p-4">
        <div className="flex gap-6 justify-end">
          <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-blue-900 transition-colors">
            <Eye size={20} />
            <span className="text-[10px] font-bold uppercase">Visualizar</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-blue-900 transition-colors">
            <Printer size={20} />
            <span className="text-[10px] font-bold uppercase">Imprimir</span>
          </button>
        </div>
      </td>
    </tr>
  );
}