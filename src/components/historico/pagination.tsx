export function Pagination() {
  return (
    <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-white border-t border-gray-100">
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
  );
}