type CardProps = {
    title?: string
    number?: number | string
    icon?: string
    backgroundColor?: string
    titleColor?: string
    numberColor?: string
}

function Card({ title, number, icon, backgroundColor = "bg-redLight", titleColor = "text-textPrimary", numberColor = "text-redPrimary" }: CardProps) {
    return <div className="p-3 bg-white rounded-2xl shadow-lg flex flex-row justify-between gap-28">
        <div className="pt-4 pb-4 pl-5">
            <h3 className={`text-lg font-bold ${titleColor}`}>{title}</h3>
            <h1 className={`text-2xl font-bold ${numberColor}`}>{number}</h1>
        </div>
        <div className="pt-4 pb-6 pr-5">
            <div className={`w-12 h-12 bg-linear-to-r ${backgroundColor} rounded-xl flex items-center justify-center`}>
                <img src={icon} alt={title} width={32} height={32}/>
            </div>
        </div>
    </div>
}

export default Card