import { useNavigate } from "react-router-dom";
import auth_service from "../service/auth_service";
import profile from "../assets/Profile.png";
import logo from "../assets/logo.png";

function Menu() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth_service.logout();
    navigate("/login");
  };

  return (
    <header className="w-full h-17.5 bg-[#0F172A] px-10 flex items-center justify-between shadow-md">
      <div 
        className="cursor-pointer hover:opacity-90 transition-opacity" 
        onClick={() => navigate("/")}
      >
        <img 
            src={logo} 
            alt="Logo Manda Chefe" 
            className="h-10 w-auto object-contain" 
        />
      </div>

      <nav className="flex items-center gap-10">
        <div className="flex items-center gap-8">
            <button
              onClick={() => navigate("/")}
              className={`text-base transition-all ${
                true
                  ? "text-white font-bold border-b-2 border-white pb-1"
                  : "text-gray-400 hover:text-white font-medium"
              }`}
            >
              Painel
            </button>

            <button
              onClick={() => navigate("/historico")}
              className={`text-base transition-all ${
                false
                  ? "text-white font-bold border-b-2 border-white pb-1"
                  : "text-gray-400 hover:text-white font-medium"
              }`}
            >
              Histórico
            </button>
        </div>

        <button onClick={handleLogout} title="Sair" className="hover:scale-105 transition-transform">
          <img 
            src={profile} 
            alt="Perfil" 
            className="w-9 h-9 rounded-full border border-gray-600" 
          />
        </button>
      </nav>
    </header>
  );
}

export default Menu;