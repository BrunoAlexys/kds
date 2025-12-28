import { Navigate, Outlet } from "react-router-dom";
import auth_service from "../service/auth_service";

const PublicRoutes = () => {
    const isAuth = auth_service.isAuthenticated();
    return isAuth ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoutes;