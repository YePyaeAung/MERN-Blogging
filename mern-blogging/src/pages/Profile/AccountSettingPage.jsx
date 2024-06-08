import { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/ToastOptions";
import { useNavigate } from "react-router-dom";
import BtnLoader from "../../components/BtnLoader";

const AccountSettingPage = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isChanging, setIsChanging] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { setAuth, authUser, setAuthUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChangePassword = async () => {
        try {
            setIsChanging(true);
            setTimeout(async () => {
                const { data } = await axios.post("/change-password", {
                    oldPassword,
                    newPassword,
                    authUser,
                });
                setIsChanging(false);
                if (data.success) {
                    toast.success(data.message, toastOptions);
                    await axios.post("/logout");
                    setAuth(false);
                    setAuthUser({});
                    navigate("/login");
                    toast.info("Please Login Again!", toastOptions);
                } else {
                    toast.error(data.message, toastOptions);
                }
            }, 2000);
        } catch (error) {
            toast.error(error.message, toastOptions);
        }
    };

    const removeAccount = async () => {
        try {
            setIsDeleting(true);
            const { data } = await axios.post("/delete-account", {
                email,
                password,
                authUser,
            });
            setIsDeleting(false);
            if (data.success) {
                toast.success(data.message, toastOptions);
                await axios.post("/logout");
                setAuth(false);
                setAuthUser({});
                navigate("/register");
                toast.info("Please Login Again!", toastOptions);
            } else {
                toast.error(data.message, toastOptions);
            }
        } catch (error) {
            toast.error(error.message, toastOptions);
        }
    };

    return (
        <>
            <div className="row mt-5">
                <h5>Change Your Password</h5>
                <form
                    className="card bg-dark col-12 p-4"
                    onSubmit={e => {
                        e.preventDefault();
                        handleChangePassword();
                    }}
                >
                    <div className="form-group">
                        <label htmlFor="">Enter Current Password</label>
                        <input
                            type="password"
                            className="form-control"
                            onChange={e => {
                                setOldPassword(e.target.value);
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Enter New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            onChange={e => {
                                setNewPassword(e.target.value);
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary float-right mt-4"
                    >
                        {isChanging ? (
                            <>
                                <BtnLoader text={"Changing..."} />
                            </>
                        ) : (
                            "Change"
                        )}
                    </button>
                </form>
            </div>
            <div className="row mt-5">
                <h5>Delete Your Account</h5>
                <form
                    className="card bg-dark col-12 p-4"
                    onSubmit={e => {
                        e.preventDefault();
                        removeAccount();
                    }}
                >
                    <div className="form-group">
                        <label htmlFor="">Enter Email</label>
                        <input
                            type="email"
                            className="form-control"
                            onChange={e => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Enter Password</label>
                        <input
                            type="password"
                            className="form-control"
                            onChange={e => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary float-right mt-4"
                    >
                        {isDeleting ? (
                            <>
                                <BtnLoader text={"Deleting Your Account..."} />
                            </>
                        ) : (
                            "Delete Account"
                        )}
                    </button>
                </form>
            </div>
        </>
    );
};

export default AccountSettingPage;
