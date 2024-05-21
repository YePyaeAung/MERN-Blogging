import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const RedirectIfNotAuth = ({ children }) => {
    const { auth } = useContext(AuthContext);
    if (auth == false) {
        return <Navigate to={"/login"} />;
    } else {
        return children;
    }
};

export default RedirectIfNotAuth;
