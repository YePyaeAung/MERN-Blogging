import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "../../utils/ToastOptions.js";
import Master from "../layout/Master.jsx";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader.jsx";
import globalUrl from "../../data/globalUrl.js";

const EditArticlePage = () => {
    const [tags, setTags] = useState([]);
    const [languages, setLanguages] = useState([]);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [description, setDescription] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const [dbImage, setDbImage] = useState("");
    const [dbTags, setDbTags] = useState([]);
    const [dbLanguages, setDbLanguages] = useState([]);

    const { slug } = useParams();

    // const getTagsAndLanguages = async () => {
    //     try {
    //         const data = await axios.get("/auth/article/tags-languages");
    //         setTags(await data.data.data.tags);
    //         setLanguages(await data.data.data.languages);
    //     } catch (error) {
    //         toast.error("Failed to fetch tags and languages!", toastOptions);
    //     }
    // };

    // const getArticleData = async () => {
    //     try {
    //         const article = await axios.get(`/auth/article/edit/${slug}`);
    //         console.log(article.data);
    //     } catch (error) {
    //         toast.error("Failed to fetch article data!", toastOptions);
    //     }
    // };

    const fetchData = async () => {
        try {
            const promises = [];
            promises.push(axios.get("/auth/article/tags-languages"));
            promises.push(axios.get(`/auth/article/edit/${slug}`));

            const [tagsAndLangsRes, articleRes] = await Promise.all(promises);
            const tagsAndLangsData = tagsAndLangsRes.data.data;
            const articleData = articleRes.data.data;

            setTags(tagsAndLangsData.tags);
            setLanguages(tagsAndLangsData.languages);
            setTitle(articleData.title);
            setDbImage(articleData.image);
            setDescription(articleData.description);
            setDbTags(articleData.tags);
            setDbLanguages(articleData.languages);
        } catch (error) {
            toast.error("Failed to fetch data!", toastOptions);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        setIsLoading(false);
    }, []);

    /* Formatted Tags and Languages | Change selectedTags and selectedLanguages */

    /* Code Style 1 */
    // useEffect(() => {
    //     const formattedTagsData = tags.filter(tag =>
    //         dbTags.some(dbTag => dbTag.slug === tag.value)
    //     );
    //     setSelectedTags(formattedTagsData);
    // }, [tags, dbTags]);

    // useEffect(() => {
    //     const formattedLanguagesData = languages.filter(language =>
    //         dbLanguages.some(dbLanguage => dbLanguage.slug === language.value)
    //     );
    //     setSelectedLanguages(formattedLanguagesData);
    // }, [languages, dbLanguages]);

    /* Code Style 2 */
    useEffect(() => {
        const formattedTagsData = [];
        tags.map(tag => {
            dbTags.map(dbTag => {
                if (dbTag.slug == tag.value) {
                    formattedTagsData.push(tag);
                }
            });
        });
        setSelectedTags(formattedTagsData);
    }, [tags, dbTags]);

    useEffect(() => {
        const formattedLanguagesData = [];
        languages.map(language => {
            dbLanguages.map(dbLanguage => {
                if (dbLanguage.slug == language.value) {
                    formattedLanguagesData.push(language);
                }
            });
        });
        setSelectedLanguages(formattedLanguagesData);
    }, [languages, dbLanguages]);
    /* Style 1 and 2 are the same, you can use one the these. */

    const storeArticle = async () => {
        const formData = new FormData();
        formData.append("title", title);
        if (image) formData.append("image", image);
        formData.append("selectedTags", JSON.stringify(selectedTags));
        formData.append("selectedLanguages", JSON.stringify(selectedLanguages));
        formData.append("description", description);
        try {
            const response = await axios.post("/auth/article", formData);
            if (response.data.success) {
                return toast.success(response.data.message, toastOptions);
            } else {
                return toast.error("Something Went Wrong!", toastOptions);
            }
        } catch (error) {
            toast.error("Something went wrong!", toastOptions);
        }
    };

    return (
        <Master>
            <div className="row mt-3">
                {isLoading ? (
                    <Loader />
                ) : (
                    <div className="col-12 card bg-dark p-3">
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                storeArticle();
                            }}
                        >
                            <h3 className="text-primary">Edit Article</h3>
                            <div className="d-flex">
                                <div className="col-6">
                                    <input
                                        type="text"
                                        className="form-control bg-dark"
                                        placeholder="Enter Title"
                                        name="title"
                                        id="title"
                                        onChange={e => setTitle(e.target.value)}
                                        value={title}
                                    />
                                </div>
                                <div className="col-6">
                                    <input
                                        type="file"
                                        className="form-control bg-dark"
                                        placeholder="Enter Image"
                                        name="image"
                                        id="image"
                                        onChange={e =>
                                            setImage(e.target.files[0])
                                        }
                                    />
                                </div>
                            </div>
                            <div className="d-flex">
                                <img
                                    className="col-12"
                                    src={`${globalUrl.host}/images/${dbImage}`}
                                    style={{
                                        width: 200,
                                        marginTop: "20px",
                                    }}
                                    alt=""
                                />
                            </div>
                            <div className="d-flex">
                                <div className="col-6 mt-3">
                                    <Select
                                        value={selectedTags}
                                        options={tags}
                                        isMulti
                                        placeholder="Select Tags"
                                        onChange={data => setSelectedTags(data)}
                                    />
                                </div>
                                <div className="col-6 mt-3">
                                    <Select
                                        value={selectedLanguages}
                                        options={languages}
                                        isMulti
                                        placeholder="Select Languages"
                                        onChange={data =>
                                            setSelectedLanguages(data)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <ReactQuill
                                    theme="snow"
                                    value={description}
                                    onChange={setDescription}
                                    className="custom-quill"
                                />
                            </div>
                            <div className="col-12 text-right marginTop">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Save Article
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </Master>
    );
};

export default EditArticlePage;
