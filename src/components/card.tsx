type CardProps = {
    title?: string
    number?: number | string
    icon?: string
    backgroundColor?: string
    borderColor?: string
    titleColor?: string
    numberColor?: string
}

function Card({ 
    title, 
    number, 
    icon, 
    backgroundColor = "bg-gray-100", 
    borderColor = "FF5151",
    titleColor = "text-[#4B5563]", 
    numberColor = "text-[#FF5151]" 
}: CardProps) {
    return (
        <div 
            className="p-3 bg-white rounded-2xl border-t-4 shadow-lg flex flex-row justify-between items-center gap-4"
            style={{ borderTopColor: `#${borderColor}` }}
        >
            <div className="pt-4 pb-4 pl-5">
                <h3 className={`text-sm font-bold opacity-70 ${titleColor}`}>{title}</h3>
                <h1 className={`text-2xl font-bold ${numberColor}`}>{number}</h1>
            </div>
            
            <div className="pr-5">
                <div className={`w-12 h-12 ${backgroundColor} rounded-xl flex items-center justify-center`}>
                    <img 
                        src={icon} 
                        alt={title} 
                        width={28} 
                        height={28} 
                    />
                </div>
            </div>
        </div>
    );
}

export default Card;