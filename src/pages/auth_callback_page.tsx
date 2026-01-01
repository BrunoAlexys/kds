import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import auth_service from '../service/auth_service';
import toast from 'react-hot-toast';

function AuthCallbackPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const hasRun = useRef(false);

    useEffect(() => {
        const code = searchParams.get('code');

        if (code) {
            if (hasRun.current) return;
            hasRun.current = true;

            auth_service.loginWithGoogle(code)
                .then((success) => {
                    if (success) {
                        toast.success("Login realizado com sucesso!", { 
                            id: 'login-success',
                            duration: 2000 
                        });
                        
                        setTimeout(() => {
                            navigate("/dashboard", { replace: true }); 
                        }, 500);
                    } else {
                        navigate("/login", { 
                            state: { errorMessage: "Falha ao realizar login com Google." },
                            replace: true
                        });
                    }
                })
                .catch(err => {
                    console.error(err);
                    navigate("/login", { 
                        state: { errorMessage: "Erro de conexão com o servidor." },
                        replace: true
                    });
                });
        } else {
            navigate("/login");
        }
    }, [searchParams, navigate]);

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-gray-50">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
            <h1 className="text-xl font-medium text-gray-700">Validando acesso...</h1>
        </div>
    );
}

export default AuthCallbackPage;