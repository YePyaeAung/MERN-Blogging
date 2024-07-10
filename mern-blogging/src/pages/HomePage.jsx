import { useEffect, useState } from "react";
import Master from "./layout/Master";
import axios from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/ToastOptions";
import Loader from "../components/Loader";
import globalUrl from "../data/globalUrl";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [latestArticles, setLatestArticles] = useState([]);
    const [mostCommentArticle, setMostCommentArticle] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const getLatestArticles = async () => {
        try {
            setIsLoading(true);
            setTimeout(async () => {
                const { data } = await axios.get("/get-latest-articles");
                setLatestArticles(data.data.latest_articles);
                setMostCommentArticle(data.data.mostCommentArticle);
                setIsLoading(false);
            }, 500);
        } catch (error) {
            return toast.error(error, toastOptions);
        }
    };

    const convertHtmlToFirst50Words = html => {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = html;
        const textContent =
            tempElement.textContent || tempElement.innerText || "";
        const words = textContent.split(/\s+/).slice(0, 50).join(" ");
        return words;
    };

    useEffect(() => {
        getLatestArticles();
    }, []);

    return (
        <Master>
            <div className="mt-4">
                <input
                    placeholder="Search Blog..."
                    type="text"
                    className="form-control rounded bg-card"
                />
            </div>
            {isLoading ? (
                <div className="mt-5">
                    <Loader />
                </div>
            ) : (
                <>
                    {latestArticles && mostCommentArticle ? (
                        <>
                            {/* First blog */}
                            <Link
                                to={`/article/${mostCommentArticle._id}`}
                                className="mt-4"
                            >
                                <div className="d-flex rounded bg-card">
                                    <img
                                        style={{ width: 400 }}
                                        src={`${globalUrl.host}/images/${mostCommentArticle?.image}`}
                                        className="rounded"
                                        alt="Fullstack blog"
                                    />
                                    <div className="p-3">
                                        {mostCommentArticle?.tags?.map(tag => (
                                            <b
                                                key={tag._id}
                                                className="btn btn-sm btn-dark text-warning"
                                            >
                                                {tag.name}
                                            </b>
                                        ))}
                                        <h3 className="text-white">
                                            {mostCommentArticle.title}
                                        </h3>
                                        <p className="text-muted">
                                            {convertHtmlToFirst50Words(
                                                mostCommentArticle.description
                                            )}
                                            ...
                                        </p>
                                        <div className="d-flex justify-content-between">
                                            <div className="text-primary d-flex">
                                                <i className="bx bx-user mr-2" />
                                                <small>
                                                    {
                                                        mostCommentArticle?.user
                                                            ?.name
                                                    }
                                                </small>
                                            </div>
                                            <div className="text-success d-flex">
                                                <i className="bx bx-happy-heart-eyes mr-2" />
                                                <small>
                                                    {
                                                        mostCommentArticle.view_count
                                                    }
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <div className="mt-4 blog-list">
                                <div className="row p-0 m-0">
                                    {latestArticles.map(article => (
                                        <div
                                            key={article._id}
                                            className="col-6 pl-0 mt-4"
                                        >
                                            <Link
                                                to={`/article/${article._id}`}
                                                className="rounded bg-card"
                                            >
                                                <img
                                                    className="rounded w-100"
                                                    src={`${globalUrl.host}/images/${article.image}`}
                                                    style={{
                                                        height: "300px",
                                                        objectFit: "contain",
                                                    }}
                                                    alt=""
                                                />
                                                <div className="p-4 text-white">
                                                    <h4 className="text-white">
                                                        {article.title}
                                                    </h4>
                                                    <div className="d-flex justify-content-between">
                                                        <button className="btn btn-dark d-flex">
                                                            <span className="text-success mr-2">
                                                                <i className="bx bx-happy-heart-eyes" />
                                                            </span>
                                                            {article.view_count}
                                                        </button>
                                                        <button className="btn btn-dark d-flex">
                                                            <span className="text-success mr-2">
                                                                <i className="bx bx-heart" />
                                                            </span>
                                                            {article.like_count}
                                                        </button>
                                                        <button className="btn btn-dark d-flex">
                                                            <span className="text-success mr-2">
                                                                <i className="bx bx-message-square-dots" />
                                                            </span>
                                                            {
                                                                article.comment_count
                                                            }
                                                        </button>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <h5 className="d-flex justify-content-center mt-5">
                            No Article Found...
                        </h5>
                    )}
                </>
            )}
        </Master>
    );
};

export default HomePage;
