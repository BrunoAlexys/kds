import { useState, forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-gray-600">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-gray-600">
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
);

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, type = 'text', className, error, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === 'password';

        const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

        const togglePassword = () => setShowPassword((prev) => !prev);

        return (
            <div className="flex flex-col w-full gap-2 mb-4">
                <label className="pl-2 text-xl font-bold text-gray-900 tracking-tight">
                    {label}
                </label>

                <div className="relative">
                    <input
                        ref={ref}
                        type={inputType}
                        className={`
                            w-full border rounded-xl p-3 text-gray-600 text-lg
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            placeholder:text-gray-400 transition-all duration-200
                            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
                            ${className}
                        `}
                        {...props}
                    />

                    {isPassword && (
                        <button
                            type="button"
                            onClick={togglePassword}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 transition-colors"
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                        </button>
                    )}
                </div>
                {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;