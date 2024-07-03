import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/ToastOptions";
import axios from "axios";
import Loader from "./Loader";
import globalUrl from "../data/globalUrl";
import { Link } from "react-router-dom";

const MostLoveArticles = () => {
    const [loveArticles, setLoveArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getMostLoveArticles = async () => {
        try {
            setIsLoading(true);
            setTimeout(async () => {
                const { data } = await axios.get("/get-most-love-articles");
                setLoveArticles(data.data);
                setIsLoading(false);
            }, 500);
        } catch (error) {
            return toast.error(error.message, toastOptions);
        }
    };

    useEffect(() => {
        getMostLoveArticles();
    }, []);

    return (
        <div className="bg-card p-3 mt-4">
            <h5 className="text-primary"> Most Love Articles</h5>
            {isLoading ? (
                <div className="my-5">
                    <Loader />
                </div>
            ) : (
                <div className="row">
                    {loveArticles.map(article => (
                        <Link
                            to={`/article/${article._id}`}
                            key={article._id}
                            className="col-6"
                        >
                            <div className="bg-dark rounded">
                                <img
                                    src={`${globalUrl.host}/images/${article.image}`}
                                    className="w-100 rounded"
                                    style={{
                                        height: "100px",
                                        objectFit: "contain",
                                    }}
                                    alt=""
                                />
                                <p className="text-white text-center p-2">
                                    {article.title}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MostLoveArticles;
