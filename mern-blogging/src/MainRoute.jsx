import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./contexts/AuthContext";
import ProfilePage from "./pages/ProfilePage";
import RedirectIfNotAuth from "./pages/RouteMiddleware/RedirectIfNotAuth";
import RedirectIfAuth from "./pages/RouteMiddleware/RedirectIfAuth";

const MainRoute = () => {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/register"
                        element={
                            <RedirectIfAuth>
                                <RegisterPage />
                            </RedirectIfAuth>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <RedirectIfAuth>
                                <LoginPage />
                            </RedirectIfAuth>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <RedirectIfNotAuth>
                                <ProfilePage />
                            </RedirectIfNotAuth>
                        }
                    />
                </Routes>
            </AuthContextProvider>
            <ToastContainer />
        </BrowserRouter>
    );
};

export default MainRoute;
