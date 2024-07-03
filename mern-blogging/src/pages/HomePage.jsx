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
    const [isLoading, setIsLoading] = useState(false);

    const getLatestArticles = async () => {
        try {
            setIsLoading(true);
            setTimeout(async () => {
                const { data } = await axios.get("/get-latest-articles");
                setLatestArticles(data.data);
                setIsLoading(false);
            }, 500);
        } catch (error) {
            return toast.error(error, toastOptions);
        }
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
            {/* First blog */}
            <div className="mt-4">
                <div className="d-flex rounded bg-card">
                    <img
                        style={{ width: 400 }}
                        src="https://toka.b-cdn.net/wp-content/uploads/2022/01/black-man-looking-stock-market-exchange-information-computer-crypto-currency.png"
                        className="rounded"
                        alt="Fullstack blog"
                    />
                    <div className="p-3">
                        <b className="text-warning">Fullstack</b>
                        <h3 className="text-white">
                            What is MERN Fullstack App?
                        </h3>
                        <p className="text-white">
                            MERN Stackဆိုတာဘာလည်း ဘယ်လိုအလုပ်လုပ်တာလည်းအပြင်
                            သူ့ကိုလေ့လာဖို့ road map ပါ
                            တစ်ခါတည်းရှင်းပြပေးသွားမှာဖြစ်ပါတယ်။ MERN
                            Stackဆိုတာဘာလည်း ဘယ်လိုအလုပ်လုပ်တာလည်းအပြင်
                            သူ့ကိုလေ့လာဖို့ road map ပါ
                            တစ်ခါတည်းရှင်းပြပေးသွားမှာဖြစ်ပါတယ်။ MERN
                            Stackဆိုတာဘာလည်း ဘယ်လိုအလုပ်လုပ်တာလည်းအပြင်
                            သူ့ကိုလေ့လာဖို့ road map ပါ
                            တစ်ခါတည်းရှင်းပြပေးသွားမှာဖြစ်ပါတယ်။
                        </p>
                        <div className="d-flex justify-content-between">
                            <div>
                                <a href="#" className="text-muted d-flex">
                                    <i className="bx bx-user mr-2" />
                                    <small>Aung Aung</small>
                                </a>
                            </div>
                            <div>
                                <a href="#" className="text-muted d-flex">
                                    <i className="bx bx-happy-heart-eyes mr-2" />
                                    <small>6785</small>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 blog-list">
                {isLoading ? (
                    <div className="mt-5">
                        <Loader />
                    </div>
                ) : (
                    <div className="row p-0 m-0">
                        {latestArticles.map(article => (
                            <div key={article._id} className="col-6 pl-0 mt-4">
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
                                                {article.comment_count}
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Master>
    );
};

export default HomePage;
