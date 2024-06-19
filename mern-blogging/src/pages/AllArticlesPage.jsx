import { useEffect, useState } from "react";
import Master from "./layout/Master";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/ToastOptions";

const AllArticlesPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [tags, setTags] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [articles, setArticles] = useState([]);

    const [selectedTags, setSelectedTags] = useState("");
    const [selectedLangs, setSelectedLangs] = useState("");
    const [searchTitle, setSearchTitle] = useState("");

    const fetchData = async () => {
        try {
            const promises = [];
            promises.push(axios.get("/get-tags-langs"));
            promises.push(axios.get(`/auth/article`));

            const [tagsAndLangsRes, articleRes] = await Promise.all(promises);
            setTags(tagsAndLangsRes.data.data.tags);
            setLanguages(tagsAndLangsRes.data.data.langs);
            setArticles(articleRes.data.data.articles);
        } catch (error) {
            toast.error("Failed to fetch data!", toastOptions);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        setIsLoading(false);
    }, []);

    return (
        <Master>
            <div className="mt-4 d-flex justify-content-between align-items-center">
                <input
                    defaultValue={searchTitle}
                    onChange={e => setSearchTitle(e.target.value)}
                    placeholder="Search Blog..."
                    type="text"
                    className="form-control rounded bg-card w-50"
                />
                <select
                    defaultValue={selectedTags}
                    onChange={e => setSelectedTags(e.target.value)}
                    className="form-select btn btn-secondary"
                >
                    <option value={""}>Tags</option>
                    {tags.map(tag => (
                        <option key={tag._id} value={tag._id}>
                            {tag.name}
                        </option>
                    ))}
                </select>
                <select
                    defaultValue={selectedLangs}
                    onChange={e => setSelectedLangs(e.target.value)}
                    className="form-select btn btn-secondary"
                >
                    <option value={""}>Languages</option>
                    {languages.map(language => (
                        <option key={language._id} value={language._id}>
                            {language.name}
                        </option>
                    ))}
                </select>
                <button className="btn btn-danger">Search</button>
            </div>
            <div className="mt-4 blog-list">
                {isLoading ? (
                    <div className="mt-5">
                        <Loader />
                    </div>
                ) : (
                    <div className="row p-0 m-0">
                        {/* loop here */}
                        <div className="col-6 pl-0 mt-4">
                            <Link to={``} className="rounded bg-card">
                                <img
                                    className="rounded w-100"
                                    src={``}
                                    style={{
                                        height: "300px",
                                        objectFit: "contain",
                                    }}
                                    alt=""
                                />
                                <div className="p-4 text-white">
                                    <h4 className="text-white">Title</h4>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-dark d-flex">
                                            <span className="text-success mr-2">
                                                <i className="bx bx-happy-heart-eyes" />
                                            </span>
                                            12
                                        </button>
                                        <button className="btn btn-dark d-flex">
                                            <span className="text-success mr-2">
                                                <i className="bx bx-heart" />
                                            </span>
                                            44
                                        </button>
                                        <button className="btn btn-dark d-flex">
                                            <span className="text-success mr-2">
                                                <i className="bx bx-message-square-dots" />
                                            </span>
                                            6
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-6 pl-0 mt-4">
                            <Link to={``} className="rounded bg-card">
                                <img
                                    className="rounded w-100"
                                    src={``}
                                    style={{
                                        height: "300px",
                                        objectFit: "contain",
                                    }}
                                    alt=""
                                />
                                <div className="p-4 text-white">
                                    <h4 className="text-white">Title</h4>
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-dark d-flex">
                                            <span className="text-success mr-2">
                                                <i className="bx bx-happy-heart-eyes" />
                                            </span>
                                            12
                                        </button>
                                        <button className="btn btn-dark d-flex">
                                            <span className="text-success mr-2">
                                                <i className="bx bx-heart" />
                                            </span>
                                            44
                                        </button>
                                        <button className="btn btn-dark d-flex">
                                            <span className="text-success mr-2">
                                                <i className="bx bx-message-square-dots" />
                                            </span>
                                            6
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </Master>
    );
};

export default AllArticlesPage;
