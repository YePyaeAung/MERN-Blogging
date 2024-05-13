import { Link } from "react-router-dom";
import Master from "../layout/Master";

const RegisterPage = () => {
    return (
        <Master>
            <h4 className="text-uppercase text-primary text-center mb-4">
                Register
            </h4>
            <div className="form-group d-flex align-items-center">
                <label htmlFor="" className="form-label col-2 text-white">
                    Username
                </label>
                <input
                    type="text"
                    className="form-control col-10"
                    placeholder="Enter Username"
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
                <button className="btn btn-primary w-25">Register</button>
            </div>
            <div className="text-center">
                Already have an account? <Link to={"/login"}>Login</Link>
            </div>
        </Master>
    );
};

export default RegisterPage;
