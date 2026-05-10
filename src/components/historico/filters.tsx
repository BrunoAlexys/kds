import { Search, ChevronDown } from "lucide-react";

export function Filters() {
  return (
    <div className="p-5 flex flex-col md:flex-row gap-4 items-center bg-white">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Busca por ID, mesa ou itens"
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
        />
      </div>
      <button className="w-full md:w-auto flex items-center justify-center gap-3 bg-[#2D3A4B] hover:bg-[#1C2434] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md">
        Filtrar Por Data <ChevronDown size={20} />
      </button>
    </div>
  );
}