import { useNavigate } from "react-router-dom";
import auth_service from "../service/auth_service";

function Menu() {

  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth_service.logout();
    navigate("/login");
  }

  return (
    <div className="w-full h-24 bg-linear-to-r from-redPrimary to-redSecondary">
      <button className="m-6 bg-white p-2 rounded-2xl" onClick={handleLogout}>Sair</button>
    </div>
  )
}

export default Menu