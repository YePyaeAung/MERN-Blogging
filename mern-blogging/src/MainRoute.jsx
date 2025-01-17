import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./contexts/AuthContext";
import ProfilePage from "./pages/ProfilePage";
import RedirectIfNotAuth from "./pages/RouteMiddleware/RedirectIfNotAuth";
import RedirectIfAuth from "./pages/RouteMiddleware/RedirectIfAuth";
import EditArticlePage from "./pages/Profile/EditArticlePage";
import SingleArticlePage from "./pages/SingleArticlePage";
import AllArticlesPage from "./pages/AllArticlesPage";

const MainRoute = () => {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/get-all-articles"
                        element={<AllArticlesPage />}
                    />
                    <Route
                        path="/article/:id"
                        element={<SingleArticlePage />}
                    />
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
                    <Route
                        path="/edit/article/:id"
                        element={
                            <RedirectIfNotAuth>
                                <EditArticlePage />
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
