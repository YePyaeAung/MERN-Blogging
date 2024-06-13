import { Link, useNavigate } from "react-router-dom";
import Master from "../layout/Master";
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/ToastOptions";
import BtnLoader from "../../components/BtnLoader";
import AuthContext from "../../contexts/AuthContext";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    const handleRegister = async () => {
        try {
            setIsLoading(true);
            setTimeout(async () => {
                const { data } = await axios.post("/register", {
                    name,
                    email,
                    password,
                });
                setIsLoading(false);
                if (data.success) {
                    setAuth(true);
                    toast.success(data.message, data);
                } else {
                    toast.error(data.message, null);
                }
                return navigate("/");
            }, 2000);
        } catch (error) {
            toast.error(error.message, toastOptions);
        }
    };

    return (
        <Master>
            <h4 className="text-uppercase text-primary text-center mb-4">
                Register
            </h4>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    handleRegister();
                }}
            >
                <div className="form-group d-flex align-items-center">
                    <label htmlFor="" className="form-label col-2 text-white">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control col-10"
                        placeholder="Enter Username"
                        value={name}
                        onChange={e => {
                            setName(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group d-flex align-items-center">
                    <label htmlFor="" className="form-label col-2 text-white">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control col-10"
                        placeholder="Enter Email"
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group d-flex align-items-center mb-5">
                    <label htmlFor="" className="form-label col-2 text-white">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control col-10"
                        placeholder="Enter Password"
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <div className="text-right">
                    <button type="submit" className="btn btn-primary w-25">
                        {isLoading ? (
                            <>
                                <BtnLoader text={"Registering..."} />
                            </>
                        ) : (
                            "Register"
                        )}
                    </button>
                </div>
                <div className="text-center">
                    Already have an account? <Link to={"/login"}>Login</Link>
                </div>
            </form>
        </Master>
    );
};

export default RegisterPage;
