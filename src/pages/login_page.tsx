import Button from "../components/button";
import Input from "../components/input";
import Google from "../assets/google.png";
import Logo from "../assets/logo.png";
import { useForm, type SubmitHandler } from "react-hook-form";
import { LoginSchema, type LoginFormData } from "../schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import auth_service from "../service/auth_service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function LoginPage() {

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        console.log("Dados do formulário:", data);
        
        const success = await auth_service.login(data.email, data.password);
        if (success) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success("Login realizado com sucesso!", { duration: 2000 });
            navigate("/dashboard");
        } else {
            toast.error("Email ou senha incorretos.");
        }
    };

    return (
        <div className="flex flex-row min-h-screen w-full bg-linear-to-br from-[#0D47A1] to-[#1976D2]">
            <div className="w-1/2 bg-white rounded-r-lg ">
                <div className="flex flex-col justify-center items-center mt-16">
                    <h1 className="font-bold text-5xl">Bem vindo!</h1>
                    <h2 className="text-2xl">Faça login para acessar sua conta</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="px-12 pt-10">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Digite seu email"
                            {...register("email")}
                            error={errors.email?.message || ""}
                        />
                        <Input
                            label="Senha"
                            type="password"
                            placeholder="Digite sua senha"
                            {...register("password")}
                            error={errors.password?.message || ""}
                        />
                        <button className="cursor-pointer">Esqueceu sua senha?</button>
                    </div>
                    <div className="px-12 pt-10">
                        <Button
                            className="cursor-pointer"
                            variant="primary"
                            isLoading={isSubmitting}>
                            Entrar
                        </Button>
                        <div className="relative flex py-5 items-center">
                            <div className="grow border-t border-gray-300"></div>
                            <span className="shrink-0 mx-4 text-gray-400 text-sm">Ou</span>
                            <div className="grow border-t border-gray-300"></div>
                        </div>
                        <Button className="cursor-pointer" variant="outline" icon={<img src={Google} alt="Google" className="w-5 h-5" />}>Entrar com o Google</Button>
                    </div>
                </form>
            </div>
            <div className="w-1/2 flex justify-center">
                <img src={Logo} alt="Logo" className="w-80 h-80 pt-10" />
            </div>
        </div>
    );
}

export default LoginPage;