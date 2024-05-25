const AccountSettingPage = () => {
    return (
        <div className="row mt-5">
            <div className="col-12">
                <div className="form-group">
                    <label htmlFor="">
                        Enter Current Password
                    </label>
                    <input type="password" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="">
                        Enter New Password
                    </label>
                    <input type="password" className="form-control" />
                </div>
                <button className="btn btn-primary float-right mt-4">Change</button>
            </div>
        </div>
    );
};

export default AccountSettingPage;
