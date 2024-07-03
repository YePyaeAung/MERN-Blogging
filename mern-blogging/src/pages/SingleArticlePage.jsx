import { Link, useNavigate, useParams } from "react-router-dom";
import globalUrl from "../data/globalUrl";
import Master from "./layout/Master";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/ToastOptions";
import Loader from "../components/Loader";
import AuthContext from "../contexts/AuthContext";
import moment from "moment";

const SingleArticlePage = () => {
    const [article, setArticle] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();
    const { auth } = useContext(AuthContext);

    const [comment, setComment] = useState("");
    const [commentLoader, setCommentLoader] = useState(false);
    const [commentSubmitted, setCommentSubmitted] = useState(false);

    const [comments, setComments] = useState([]);

    const getSingleArticle = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(`/article/${id}`);
            setArticle(data.data.article);
            setComments(data.data.comments);
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

    const storeComment = async () => {
        try {
            setCommentLoader(true);
            setTimeout(async () => {
                const { data } = await axios.post(
                    `${globalUrl.host}/api/comment/store`,
                    { comment, article_id: article._id }
                );
                if (data.data.auth == 0) {
                    return toast.error("Please Login First!", toastOptions);
                }
                setCommentLoader(false);
                setComment("");
                setCommentSubmitted(true);
                return toast.success(data.message, toastOptions);
            }, 500);
        } catch (error) {
            setCommentLoader(false);
            return toast.error("Something went wrong!", toastOptions);
        }
    };

    useEffect(() => {
        getSingleArticle();
    }, [id, commentSubmitted]);

    useEffect(() => {
        setCommentSubmitted(false);
    }, [article]);

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
                                    to={`/edit/article/${id}`}
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
                            <div className="col-12 mb-4">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        navigate(-1);
                                    }}
                                >
                                    Back
                                </button>
                            </div>
                            {/* Comment Form */}
                            <form
                                className="col-12 my-3"
                                onSubmit={e => {
                                    e.preventDefault();
                                    storeComment();
                                }}
                            >
                                <div className="input-group">
                                    <textarea
                                        value={comment}
                                        onChange={e =>
                                            setComment(e.target.value)
                                        }
                                        className="form-control border border-dark bg-dark"
                                        placeholder="Add a comment..."
                                    />
                                    {commentLoader ? (
                                        <button
                                            disabled
                                            className="btn btn-outline-primary"
                                        >
                                            <Loader />
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="btn btn-outline-primary"
                                        >
                                            <i className="bx bxs-send"></i>
                                        </button>
                                    )}
                                </div>
                            </form>
                            {/* Comment Lists */}
                            <div className="col-12 my-3">
                                <h5 className="text-primary">Comment Lists:</h5>
                                {/* Comment Loops */}
                                {comments.map(comment => (
                                    <div
                                        key={comment._id}
                                        className="mb-3 p-3 border border-dark rounded"
                                    >
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h6 className="">
                                                {comment.user.name}
                                            </h6>
                                            <small className="text-muted">
                                                {moment(
                                                    comment.createdAt
                                                ).fromNow()}
                                            </small>
                                        </div>
                                        <p>{comment.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Master>
    );
};

export default SingleArticlePage;
