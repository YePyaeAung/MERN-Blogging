import { Link, useNavigate } from "react-router-dom";
import Master from "../layout/Master";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/ToastOptions.js";
import Loader from "../../components/Loader.jsx";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post("/login", { email, password });
            setIsLoading(false);
            if (response.data.success == true) {
                toast.success(`Welcome ${response.data.data.name}`);
                return navigate("/");
            }
            if (response.data.data == null) {
                return toast.error(response.data.message, toastOptions);
            } else {
                // validation errors
                response.data.data.map(data => {
                    return toast.error(data.message, toastOptions);
                });
            }
        } catch (error) {
            console.log(error);
            return toast.error(
                "Login Failed! Please try again later.",
                toastOptions
            );
        }
    };
    return (
        <Master>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    handleLogin();
                }}
            >
                <h4 className="text-uppercase text-primary text-center mb-4">
                    Login
                </h4>
                <div className="form-group d-flex align-items-center">
                    <label htmlFor="" className="form-label col-2 text-white">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control col-10"
                        placeholder="Enter Email"
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
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <div className="text-right">
                    <button
                        type="submit"
                        className="btn btn-primary w-25 d-flex justify-content-center align-items-center"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader />
                            </>
                        ) : (
                            <>Login</>
                        )}
                    </button>
                </div>
                <div className="text-center">
                    Do not have account? <Link to={"/register"}>Register</Link>
                </div>
            </form>
        </Master>
    );
};

export default LoginPage;
