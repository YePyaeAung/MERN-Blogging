import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/ToastOptions";
import globalUrl from "../../data/globalUrl";

const ArticleListsPage = () => {
    const [page, setPage] = useState(1);
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPage, setTotalPage] = useState(null);

    const getArticles = async () => {
        setIsLoading(true);
        const { data } = await axios.get(`/auth/article?page=${page}`);
        setTimeout(() => {
            setArticles(data.data.articles);
            setIsLoading(false);
            setTotalPage(data.data.totalPage);
        }, 1000);
    };

    const convertHtmlToFirst10Words = html => {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = html;
        const textContent =
            tempElement.textContent || tempElement.innerText || "";
        const words = textContent.split(/\s+/).slice(0, 10).join(" ");
        return words;
    };

    useEffect(() => {
        getArticles();
    }, [page]);

    const removeArticle = async slug => {
        try {
            await axios.delete(`/auth/article/${slug}`);
            toast.success("Article Deleted!", toastOptions);
            getArticles();
        } catch (error) {
            toast.error("Something went wrong!", toastOptions);
        }
    };

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="row mt-5">
                        {/* article list */}
                        {articles.map(article => (
                            <div key={article._id} className="col-12 mt-3">
                                <div className="card bg-dark d-flex flex-row">
                                    <img
                                        src={`${globalUrl.host}/images/${article.image}`}
                                        alt=""
                                        className="w-50"
                                        style={{
                                            height: "300px",
                                            objectFit: "cover",
                                        }}
                                    />
                                    <div className="ml-3 p-3 d-flex flex-column justify-content-between">
                                        <h3 className="d-flex text-white">
                                            {article.title}
                                        </h3>
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex">
                                                <span className="text-success mr-2">
                                                    <i className="bx bx-happy-heart-eyes" />
                                                </span>
                                                <div>{article.view_count}</div>
                                            </div>
                                            <div className="d-flex">
                                                <span className="text-success mr-2">
                                                    <i className="bx bx-heart text-danger" />
                                                </span>
                                                <div>{article.like_count}</div>
                                            </div>
                                            <div className="d-flex">
                                                <span className="text-success mr-2">
                                                    <i className="bx bx-message-square-dots text-primary" />
                                                </span>
                                                <div>
                                                    {article.comment_count}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <p>
                                                {convertHtmlToFirst10Words(
                                                    article.description
                                                )}
                                                ...
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <Link
                                                to={`/article/${article.slug}`}
                                                className="btn btn-outline-primary btn-dark d-flex justify-content-center align-items-center"
                                                style={{
                                                    width: "40px",
                                                    height: "40px",
                                                }}
                                            >
                                                <span className="text-grey">
                                                    <i className="bx bx-show"></i>
                                                </span>
                                            </Link>
                                            <Link
                                                to={`/edit/article/${article.slug}`}
                                                className="btn btn-outline-primary btn-dark d-flex justify-content-center align-items-center"
                                                style={{
                                                    width: "40px",
                                                    height: "40px",
                                                }}
                                            >
                                                <span className="text-grey">
                                                    <i className="bx bx-edit"></i>
                                                </span>
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    removeArticle(article.slug);
                                                }}
                                                className="btn btn-outline-primary btn-dark d-flex justify-content-center align-items-center"
                                                style={{
                                                    width: "40px",
                                                    height: "40px",
                                                }}
                                            >
                                                <span className="text-grey">
                                                    <i className="bx bx-trash"></i>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* load more button */}
                    <div className="col-12 mt-5">
                        <div
                            className={`d-flex justify-content-${
                                page < totalPage ? `end` : `between`
                            }`}
                        >
                            {page > 1 && (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setPage(page - 1)}
                                >
                                    Back
                                </button>
                            )}

                            <button
                                disabled={page >= totalPage ? true : false}
                                className="btn btn-primary"
                                onClick={() => setPage(page + 1)}
                            >
                                Load More
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ArticleListsPage;
