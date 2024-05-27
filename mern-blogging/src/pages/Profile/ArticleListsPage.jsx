import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ArticleListsPage = () => {
    const [page, setPage] = useState(1);
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getArticles = async () => {
        const { data } = await axios.get(`/auth/article?page=${page}`);
        setArticles(data.data.articles);
        setIsLoading(false);
    };

    useEffect(() => {
        getArticles();
    }, []);

    return (
        <>
            {isLoading ? (
                <span>Loading...</span>
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
                                                {article.view_count}
                                            </div>
                                            <div className="d-flex">
                                                <span className="text-success mr-2">
                                                    <i className="bx bx-heart text-danger" />
                                                </span>
                                                {article.like_count}
                                            </div>
                                            <div className="d-flex">
                                                <span className="text-success mr-2">
                                                    <i className="bx bx-message-square-dots text-primary" />
                                                </span>
                                                {article.comment_count}
                                            </div>
                                        </div>
                                        <p>{article.description}</p>
                                        <div className="d-flex justify-content-between">
                                            <Link
                                                to={"#"}
                                                className="btn btn-secondary float-right"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                to={"#"}
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
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-primary">
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
