import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

/* eslint-disable react/prop-types */
export const AuthContextProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [authUser, setAuthUser] = useState({});

    useEffect(() => {
        (async () => {
            const response = await axios.get("/checkAuth");
            // console.log(response.data.success);
            if (response.data.success) {
                setAuth(true);
                // console.log(auth);
                setAuthUser(await response.data.data);
                return false;
            }
        })();
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth, authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
