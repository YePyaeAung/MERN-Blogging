import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/ToastOptions";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const TagsAndLangs = () => {
    const [tags, setTags] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getTagsAndLangs = async () => {
        try {
            setIsLoading(true);
            setTimeout(async () => {
                const { data } = await axios.get("/get-tags-langs");
                setTags(data.data.tags);
                setLanguages(data.data.langs);
                setIsLoading(false);
            }, 1000);
        } catch (error) {
            return toast.error("Something went wrong!", toastOptions);
        }
    };

    useEffect(() => {
        getTagsAndLangs();
    }, []);
    return (
        <>
            <div className="bg-card p-3 mt-4">
                <h5 className="text-primary">Tags</h5>
                {isLoading ? (
                    <div className="my-5">
                        <Loader />
                    </div>
                ) : (
                    <>
                        {tags.map(tag => (
                            <Link
                                to={`/get-all-articles?tag=${tag.slug}`}
                                className="btn btn-sm btn-dark mt-1"
                                key={tag._id}
                            >
                                {tag.name}{" "}
                            </Link>
                        ))}
                    </>
                )}
            </div>
            <div className="bg-card p-3 mt-4">
                <h5 className="text-primary">Programming</h5>
                {isLoading ? (
                    <div className="my-5">
                        <Loader />
                    </div>
                ) : (
                    <>
                        {languages.map(language => (
                            <Link
                                to={`/get-all-articles?language=${language.slug}`}
                                className="btn btn-sm btn-dark mt-1"
                                key={language._id}
                            >
                                {language.name}{" "}
                            </Link>
                        ))}
                    </>
                )}
            </div>
        </>
    );
};

export default TagsAndLangs;
