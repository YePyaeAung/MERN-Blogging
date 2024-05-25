import { useState } from "react";
import Master from "./layout/Master";
import CreateArticlePage from "./Profile/CreateArticlePage.jsx";
import ArticleListsPage from "./Profile/ArticleListsPage.jsx";
import AccountSettingPage from "./Profile/AccountSettingPage.jsx";

const ProfilePage = () => {
    const [typeOfTag, setTypeOfTag] = useState("create-article");
    return (
        <Master>
            <button
                className={`btn btn-${
                    typeOfTag == "create-article" ? "outline-primary" : ""
                } btn-dark`}
                onClick={() => setTypeOfTag("create-article")}
            >
                Create New Article
            </button>
            <button
                className={`btn btn-${
                    typeOfTag == "article-lists" ? "outline-primary" : ""
                } btn-dark`}
                onClick={() => setTypeOfTag("article-lists")}
            >
                My Articles
            </button>
            <button
                className={`btn btn-${
                    typeOfTag == "account-setting" ? "outline-primary" : ""
                } btn-dark`}
                onClick={() => setTypeOfTag("account-setting")}
            >
                Account Setting
            </button>
            <div className="container mt-3">
                {typeOfTag === "create-article" && <CreateArticlePage />}
                {typeOfTag === "article-lists" && <ArticleListsPage />}
                {typeOfTag === "account-setting" && <AccountSettingPage />}
            </div>
        </Master>
    );
};

export default ProfilePage;
