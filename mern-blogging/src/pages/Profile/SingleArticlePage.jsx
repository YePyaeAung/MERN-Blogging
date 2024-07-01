import { Link, useNavigate, useParams } from "react-router-dom";
import globalUrl from "../../data/globalUrl";
import Master from "../layout/Master";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/ToastOptions";
import Loader from "../../components/Loader";
import AuthContext from "../../contexts/AuthContext";

const SingleArticlePage = () => {
    const [article, setArticle] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { slug } = useParams();
    const { auth } = useContext(AuthContext);

    const getSingleArticle = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(`/auth/article/${slug}`);
            setArticle(data.data);
            setIsLoading(false);
        } catch (error) {
            toast.error("Failed to fetch Single Article!", toastOptions);
        }
    };

    const convertHtmlToPlainText = html => {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = html;
        const textContent =
            tempElement.textContent || tempElement.innerText || "";
        return textContent;
    };

    useEffect(() => {
        getSingleArticle();
    }, [slug]);

    return (
        <Master>
            {isLoading ? (
                <Loader />
            ) : (
                <div className="row">
                    <div className="col-12 card bg-dark p-3">
                        {auth && (
                            <div className="mb-3">
                                <Link
                                    to={`/edit/article/${slug}`}
                                    className="btn btn-outline-warning float-right"
                                >
                                    Edit
                                </Link>
                            </div>
                        )}
                        <div className="d-flex">
                            <img
                                className="col-12"
                                src={`${globalUrl.host}/images/${article.image}`}
                                style={{
                                    height: "300px",
                                    objectFit: "contain",
                                }}
                                alt=""
                            />
                        </div>
                        <div className="bg-card p-3 mt-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <h3 className="col-9 text-secondary">
                                    {article.title}
                                </h3>
                                <div className="col-3 d-flex justify-content-between">
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
                                        <div>{article.comment_count}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className="col-6">
                                    <h6 className="text-primary">Tags</h6>
                                    {article.tags.map(tag => (
                                        <span
                                            key={tag._id}
                                            className="btn btn-sm btn-dark mt-2"
                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                                <div className="col-6">
                                    <h6 className="text-primary">
                                        Programming
                                    </h6>
                                    {article.languages.map(language => (
                                        <span
                                            key={language._id}
                                            className="btn btn-sm btn-dark mt-2"
                                        >
                                            {language.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="col-12 my-5">
                                <p className="">
                                    {convertHtmlToPlainText(
                                        article.description
                                    )}
                                </p>
                            </div>
                            {/* Comment Lists */}
                            <div className="col-12 my-3">
                                <h5 className="text-primary">Comment Lists:</h5>
                                {/* Comment Loops */}
                                <div className="mb-3 p-3 border border-dark rounded">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h6 className="">User Name</h6>
                                        <small className="text-muted">
                                            23-3-2024
                                        </small>
                                    </div>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Culpa reiciendis fugit
                                        ipsum nulla sit quidem quam harum
                                        temporibus assumenda voluptatibus.
                                    </p>
                                </div>
                                {/* Comment Form */}
                                <form className="mb-4 ">
                                    <div className="input-group">
                                        <textarea
                                            className="form-control border border-dark bg-dark"
                                            placeholder="Add a comment..."
                                        />
                                        <button
                                            type="submit"
                                            className="btn btn-outline-primary"
                                        >
                                            <i className="bx bxs-send"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-12">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        navigate(-1);
                                    }}
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Master>
    );
};

export default SingleArticlePage;
