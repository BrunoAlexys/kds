import { ChevronsUpDown, ChevronUp, ChevronDown } from "lucide-react";

type SortDirection = "asc" | "desc" | "normal";

interface SortableHeaderProps {
  label: string;
  columnKey: string;
  sortConfig: { key: string; direction: SortDirection };
  onSort: (key: string) => void;
}

export function SortableHeader({ 
  label, 
  columnKey, 
  sortConfig, 
  onSort 
}: SortableHeaderProps) {
  
  const renderIcon = () => {
    if (sortConfig.key !== columnKey || sortConfig.direction === "normal") {
      return <ChevronsUpDown size={14} className="text-gray-500" />;
    }
    if (sortConfig.direction === "asc") {
      return <ChevronUp size={14} className="text-blue-400" />;
    }
    return <ChevronDown size={14} className="text-blue-400" />;
  };

  return (
    <th 
      onClick={() => onSort(columnKey)} 
      className="p-4 font-semibold text-sm cursor-pointer hover:bg-gray-800 transition-colors select-none"
    >
      <div className="flex items-center gap-2">
        {label} {renderIcon()}
      </div>
    </th>
  );
}