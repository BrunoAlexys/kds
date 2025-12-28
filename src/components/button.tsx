import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost';
    icon?: ReactNode;
    isLoading?: boolean;
    fullWidth?: boolean;
}

const Button = ({
    children,
    variant = 'primary',
    icon,
    isLoading = false,
    fullWidth = true,
    className = '',
    ...props
}: ButtonProps) => {
    const variants = {
        primary: "bg-[#1565C0] hover:bg-[#0D47A1] text-white border-transparent shadow-md",
        outline: "bg-white hover:bg-gray-50 text-gray-700 border-gray-300 border shadow-sm",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-600 border-transparent"
    };

    return (
        <button
            className={`
                flex items-center justify-center gap-3
                py-3.5 px-6 rounded-xl
                text-base font-bold transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
                active:scale-[0.98]
                ${fullWidth ? 'w-full' : 'w-auto'}
                ${variants[variant]}
                ${className}
            `}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
                <>
                    {icon && <span className="shrink-0">{icon}</span>}
                    <span>{children}</span>
                </>
            )}
        </button>
    );
};

export default Button;