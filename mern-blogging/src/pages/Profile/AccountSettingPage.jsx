import { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/ToastOptions";
import { useNavigate } from "react-router-dom";
import ChangPassLoader from "../../components/ChangPassLoader";

const AccountSettingPage = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { setAuth, authUser, setAuthUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChangePassword = async () => {
        try {
            setIsLoading(true);
            setTimeout(async () => {
                const { data } = await axios.post("/change-password", {
                    oldPassword,
                    newPassword,
                    authUser,
                });
                setIsLoading(false);
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

    return (
        <div className="row mt-5">
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
                    {isLoading ? (
                        <>
                            <ChangPassLoader />
                        </>
                    ) : (
                        "Change"
                    )}
                </button>
            </form>
        </div>
    );
};

export default AccountSettingPage;
