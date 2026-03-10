import Menu from "../components/menu";
import { OrderTableRow } from "../components/historico/OrderTableRow";
import { ChevronDown, Search } from "lucide-react";

const DATA = [
  { id: "#1257", date: "06/01/2026", time: "14:32", table: "Mesa 12", items: "2x Hambúrguer Clássico", subItems: "1x Refrigerante, 1x Batata Frita", value: "R$87,50", paymentMethod: "Cartão" as const },
  { id: "#0812", date: "31/12/2025", time: "12:30", table: "Mesa 11", items: "2x Parmegiana", subItems: "1x Refrigerante, 2x pudim", value: "R$78,55", paymentMethod: "Pix" as const },
  { id: "#0812", date: "31/12/2025", time: "12:30", table: "Mesa 11", items: "2x Parmegiana", subItems: "1x Refrigerante, 2x pudim", value: "R$78,55", paymentMethod: "Dinheiro" as const },
  { id: "#1257", date: "06/01/2026", time: "14:32", table: "Mesa 12", items: "2x Hambúrguer Clássico", subItems: "1x Refrigerante, 1x Batata Frita", value: "R$87,50", paymentMethod: "Cartão" as const },
];

export default function Historico() {
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col font-sans">
      <Menu />

      <main className="flex-1 p-2.5 max-w-[1400px] mx-auto w-full">
        <h1 className="text-4xl font-bold text-[#1C2434] mb-8">Histórico</h1>

        <div className="flex flex-col gap-6">
          
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Busca por ID, mesa ou itens"
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
              />
            </div>
            <button className="w-full md:w-auto flex items-center justify-center gap-3 bg-[#1C2434] hover:bg-[#111827] text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-sm">
              Filtrar Por Data <ChevronDown size={20} />
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white border-b border-gray-100">
                    <th className="p-4 w-12 text-center"><input type="checkbox" className="accent-blue-900" /></th>
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
                  {DATA.concat(DATA).map((order, index) => (
                    <OrderTableRow key={index} order={order} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-sm font-semibold text-gray-500">
              Mostrando <span className="text-gray-800">1 - 10</span> de <span className="text-gray-800">1,247</span> pedidos
            </span>
            
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-400 hover:bg-gray-50">Anterior</button>
              <button className="w-10 h-10 bg-[#1C2434] text-white rounded-lg flex items-center justify-center font-bold">1</button>
              <button className="w-10 h-10 border border-gray-200 text-gray-600 rounded-lg flex items-center justify-center font-bold hover:bg-gray-50">2</button>
              <button className="w-10 h-10 border border-gray-200 text-gray-600 rounded-lg flex items-center justify-center font-bold hover:bg-gray-50">3</button>
              <span className="px-2 text-gray-400">...</span>
              <button className="w-10 h-10 border border-gray-200 text-gray-600 rounded-lg flex items-center justify-center font-bold hover:bg-gray-50">125</button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50">Próximo</button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-500">Itens por página:</span>
              <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}