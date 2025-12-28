import { Navigate, Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import LoginPage from "../pages/login_page";
import KdsPage from "../pages/kds_page";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<PublicRoutes />}>
                <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<KdsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace/>} />
        </Routes>
    );
};

export default AppRoutes;