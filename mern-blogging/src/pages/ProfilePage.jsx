import Master from "./layout/Master";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/ToastOptions.js";

const ProfilePage = () => {
    const [tags, setTags] = useState([]);
    const [languages, setLanguages] = useState([]);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState({});
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [description, setDescription] = useState({});

    const getTagsAndLanguages = async () => {
        const data = await axios.get("/auth/article/tags-languages");
        setTags(await data.data.data.tags);
        setLanguages(await data.data.data.languages);
    };

    useEffect(() => {
        getTagsAndLanguages();
    }, []);

    const storeArticle = async () => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("image", image);
        formData.append("selectedTags", JSON.stringify(selectedTags));
        formData.append("selectedLanguages", JSON.stringify(selectedLanguages));
        formData.append("description", description);
        const data = await axios.post("/auth/article", formData);
        if (data.data.success) {
            return toast.success(data.data.message, toastOptions);
        } else {
            return toast.error("Something Went Wrong!", toastOptions);
        }
    };

    return (
        <Master>
            <button className="btn btn-dark">Create New Article</button>
            <button className="btn btn-dark">My Articles</button>
            <button className="btn btn-dark">Account Setting</button>
            <div className="container mt-3">
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        storeArticle();
                    }}
                >
                    <h3 className="text-primary">Create New Article</h3>
                    <div className="row mt-3">
                        <div className="col-6">
                            <input
                                type="text"
                                className="form-control bg-dark"
                                placeholder="Enter Title"
                                name="title"
                                id="title"
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="col-6">
                            <input
                                type="file"
                                className="form-control bg-dark"
                                placeholder="Enter Image"
                                name="image"
                                id="image"
                                onChange={e => setImage(e.target.files[0])}
                            />
                        </div>
                        <div className="col-6 mt-3">
                            <Select
                                options={tags}
                                isMulti
                                placeholder="Select Tags"
                                onChange={data => setSelectedTags(data)}
                            />
                        </div>
                        <div className="col-6 mt-3">
                            <Select
                                options={languages}
                                isMulti
                                placeholder="Select Languages"
                                onChange={data => setSelectedLanguages(data)}
                            />
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
                            <button type="submit" className="btn btn-primary">
                                Create Article
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Master>
    );
};

export default ProfilePage;
