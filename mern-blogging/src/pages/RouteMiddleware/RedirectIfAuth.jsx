import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const RedirectIfAuth = ({ children }) => {
    const { auth } = useContext(AuthContext);
    if (auth) {
        return <Navigate to={"/"} />;
    } else {
        return children;
    }
};

export default RedirectIfAuth;
