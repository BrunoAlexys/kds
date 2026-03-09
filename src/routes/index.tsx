import { Navigate, Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import LoginPage from "../pages/login_page";
import KdsPage from "../pages/kds_page";
import PrivateRoutes from "./PrivateRoutes";
import AuthCallbackPage from "../pages/auth_callback_page";
import Historico from "../pages/historico";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<PublicRoutes />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/oauth2/redirect" element={<AuthCallbackPage />} />
            </Route>
            <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<KdsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace/>} />
            <Route path="/historico" element={<Historico />} />
        </Routes>
    );
};

export default AppRoutes;