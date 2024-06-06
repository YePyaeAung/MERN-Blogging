import { useState } from "react";
import Master from "./layout/Master";
import CreateArticlePage from "./Profile/CreateArticlePage.jsx";
import ArticleListsPage from "./Profile/ArticleListsPage.jsx";
import AccountSettingPage from "./Profile/AccountSettingPage.jsx";

const ProfilePage = () => {
    const [typeOfTag, setTypeOfTag] = useState("article-lists");
    return (
        <Master>
            <div className="d-flex justify-content-between">
                <div className="">
                    <button
                        className={`btn btn-${
                            typeOfTag == "article-lists"
                                ? "outline-primary"
                                : ""
                        } btn-dark`}
                        onClick={() => setTypeOfTag("article-lists")}
                    >
                        My Articles
                    </button>
                    <button
                        className={`btn btn-${
                            typeOfTag == "create-article"
                                ? "outline-primary"
                                : ""
                        } btn-dark`}
                        onClick={() => setTypeOfTag("create-article")}
                    >
                        Create New Article
                    </button>
                </div>
                <div className="">
                    <button
                        className={`btn btn-${
                            typeOfTag == "account-setting"
                                ? "outline-primary"
                                : ""
                        } btn-dark`}
                        onClick={() => setTypeOfTag("account-setting")}
                    >
                        Account Setting
                    </button>
                </div>
            </div>
            <div className="container mt-3">
                {typeOfTag === "create-article" && (
                    <CreateArticlePage setTypeOfTag={setTypeOfTag} />
                )}
                {typeOfTag === "article-lists" && <ArticleListsPage />}
                {typeOfTag === "account-setting" && <AccountSettingPage />}
            </div>
        </Master>
    );
};

export default ProfilePage;
