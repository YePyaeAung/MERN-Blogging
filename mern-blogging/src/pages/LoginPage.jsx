import { Link } from "react-router-dom";
import Master from "./layout/Master";

const LoginPage = () => {
    return (
        <Master>
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
                />
            </div>
            <div className="text-right">
                <button className="btn btn-primary w-25">Login</button>
            </div>
            <div className="text-center">
                Do not have account? <Link to={"/register"}>Register</Link>
            </div>
        </Master>
    );
};

export default LoginPage;
