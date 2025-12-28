import { Outlet, Navigate } from "react-router-dom";
import auth_service from "../service/auth_service";

const PrivateRoutes = () => {
    const isAuth = auth_service.isAuthenticated();
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;