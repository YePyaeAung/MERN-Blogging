import { useEffect, useState } from "react";
import Master from "./layout/Master";
import Loader from "../components/Loader";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/ToastOptions";
import globalUrl from "../data/globalUrl";

const AllArticlesPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [tags, setTags] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [articles, setArticles] = useState([]);

    const [selectedTag, setSelectedTag] = useState("");
    const [selectedLang, setSelectedLang] = useState("");
    const [searchTitle, setSearchTitle] = useState("");

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState("");

    const searchNavigate = useNavigate();

    const [searchParams] = useSearchParams();
    const titleQuery = searchParams.get("title") || "";
    const tagQuery = searchParams.get("tag") || "";
    const languageQuery = searchParams.get("language") || "";

    const queryStringApi = `?title=${titleQuery}&tag=${tagQuery}&language=${languageQuery}`;

    const fetchData = async () => {
        try {
            const promises = [];
            promises.push(axios.get("/get-tags-langs"));
            promises.push(
                axios.get(`/get-all-articles/${queryStringApi}&page=${page}`)
            );

            const [tagsAndLangsRes, articleRes] = await Promise.all(promises);
            setTags(tagsAndLangsRes.data.data.tags);
            setLanguages(tagsAndLangsRes.data.data.langs);
            setArticles([...articles, ...articleRes.data.data.articles]);
            setTotalPage(articleRes.data.data.totalPage);
            setIsLoading(false);
            return;
        } catch (error) {
            toast.error("Failed to fetch data!", toastOptions);
            setIsLoading(false);
        }
    };

    const handleSearch = () => {
        searchNavigate(
            `/get-all-articles?title=${searchTitle}&tag=${selectedTag}&language=${selectedLang}`
        );
    };

    useEffect(() => {
        fetchData();
    }, [queryStringApi, page]);

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
                    defaultValue={selectedTag}
                    onChange={e => setSelectedTag(e.target.value)}
                    className="form-select btn btn-secondary"
                >
                    <option value={""}>Tags</option>
                    {tags.map(tag => (
                        <option key={tag._id} value={tag.slug}>
                            {tag.name}
                        </option>
                    ))}
                </select>
                <select
                    defaultValue={selectedLang}
                    onChange={e => setSelectedLang(e.target.value)}
                    className="form-select btn btn-secondary"
                >
                    <option value={""}>Languages</option>
                    {languages.map(language => (
                        <option key={language._id} value={language.slug}>
                            {language.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleSearch} className="btn btn-danger">
                    Search
                </button>
            </div>
            <div className="mt-4 blog-list">
                {isLoading ? (
                    <div className="mt-5">
                        <Loader />
                    </div>
                ) : (
                    <>
                        <div className="row p-0 m-0">
                            {/* loop here */}
                            {articles.map(article => (
                                <div
                                    key={article._id}
                                    className="col-6 pl-0 mt-4"
                                >
                                    <Link
                                        to={`/article/${article.slug}`}
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
                        {/* load more */}
                        {page <= totalPage && (
                            <div className="row mt-3">
                                <div className="col-12">
                                    <div className="d-flex justify-content-center">
                                        <button
                                            onClick={() => setPage(page + 1)}
                                            className="btn btn-primary"
                                        >
                                            <i className="bx bx-down-arrow-alt"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </Master>
    );
};

export default AllArticlesPage;
