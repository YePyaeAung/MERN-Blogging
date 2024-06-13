import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/ToastOptions";

const MenuBar = () => {
    const { auth, setAuth, authUser, setAuthUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const logout = async () => {
        const response = await axios.post("/logout");
        if (response.data.success) {
            setAuth(false);
            setAuthUser({});
            toast.success(response.data.message, toastOptions);
            return navigate("/login");
        }
    };

    return (
        <>
            {auth ? (
                <>
                    <Link to={"/"} className="btn btn-primary text-white">
                        Home
                    </Link>
                    <Link
                        to={"/profile"}
                        className="btn btn-primary text-white"
                    >
                        Profile ({authUser.name})
                    </Link>
                    <button
                        onClick={logout}
                        className="btn btn-primary text-white"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <Link to={"/login"} className="btn btn-primary text-white">
                        Login
                    </Link>
                    <Link
                        to={"/register"}
                        className="btn btn-primary text-white"
                    >
                        Register
                    </Link>
                </>
            )}
        </>
    );
};

export default MenuBar;
