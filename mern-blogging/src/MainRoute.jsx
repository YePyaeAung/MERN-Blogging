import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./contexts/AuthContext";
import ProfilePage from "./pages/ProfilePage";

const MainRoute = () => {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </AuthContextProvider>
            <ToastContainer />
        </BrowserRouter>
    );
};

export default MainRoute;
