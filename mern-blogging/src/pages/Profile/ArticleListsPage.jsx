import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";

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
        }, 2000);
    };

    useEffect(() => {
        getArticles();
    }, [page]);

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
                                        src={`http://localhost:8888/images/${article.image}`}
                                        alt=""
                                        className="w-50"
                                    />
                                    <div className="ml-3 p-3">
                                        <h3 className="text-white">
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
                                        <div>
                                            <p>{article.description}</p>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <Link
                                                to={"#"}
                                                className="btn btn-secondary float-right"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                to={`/edit/article/${article.slug}`}
                                                className="btn btn-primary float-right"
                                            >
                                                Edit
                                            </Link>
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
                            {page < totalPage ? (
                                <></>
                            ) : (
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
