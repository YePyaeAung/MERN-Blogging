import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const MenuBar = () => {
    const { auth, authUser } = useContext(AuthContext);
    console.log(auth);
    console.log(authUser);
    return (
        <>
            {auth ? (
                <>
                    <Link
                        to={"/profile"}
                        className="btn btn-primary text-white"
                    >
                        Profile ({authUser.name})
                    </Link>
                    <Link to={"/logout"} className="btn btn-primary text-white">
                        Logout
                    </Link>
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
