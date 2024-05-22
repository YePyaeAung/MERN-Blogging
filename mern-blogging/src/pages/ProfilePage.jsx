import Master from "./layout/Master";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
    const [tags, setTags] = useState([]);
    const [languages, setLanguages] = useState([]);

    const getTagsAndLanguages = async () => {
        const data = await axios.get("/tags-languages");
        setTags(await data.data.data.tags);
        setLanguages(await data.data.data.languages);
    };

    useEffect(() => {
        getTagsAndLanguages();
    }, []);

    const customStyles = {
        input: provided => ({
            ...provided,
            backgroundColor: "#15171F",
            color: "#8595A6", // Ensure text is visible against the black background
        }),
        multiValue: provided => ({
            ...provided,
            backgroundColor: "#15171F",
            color: "#8595A6",
        }),
        control: provided => ({
            ...provided,
            backgroundColor: "#15171F",
            color: "#8595A6",
        }),
        placeholder: provided => ({
            ...provided,
            color: "#8595A6",
        }),
        singleValue: provided => ({
            ...provided,
            color: "#8595A6",
        }),
    };

    const [value, setValue] = useState("");

    return (
        <Master>
            <button className="btn btn-dark">Create New Article</button>
            <button className="btn btn-dark">My Articles</button>
            <div className="container mt-3">
                <h3 className="text-primary">Create New Article</h3>
                <div className="row mt-3">
                    <div className="col-6">
                        <input
                            type="text"
                            className="form-control bg-dark"
                            placeholder="Enter Title"
                            name=""
                            id=""
                        />
                    </div>
                    <div className="col-6">
                        <input
                            type="file"
                            className="form-control bg-dark"
                            placeholder="Enter Image"
                            name=""
                            id=""
                        />
                    </div>
                    <div className="col-6 mt-3">
                        <Select
                            options={tags}
                            isMulti
                            placeholder="Select Tags"
                            styles={customStyles}
                        />
                    </div>
                    <div className="col-6 mt-3">
                        <Select
                            options={languages}
                            isMulti
                            placeholder="Select Languages"
                            styles={customStyles}
                        />
                    </div>
                    <div className="col-12 mt-3">
                        <ReactQuill
                            theme="snow"
                            value={value}
                            onChange={setValue}
                            className="custom-quill"
                        />
                    </div>
                    <div className="col-12 text-right marginTop">
                        <button className="btn btn-primary">
                            Create Article
                        </button>
                    </div>
                </div>
            </div>
        </Master>
    );
};

export default ProfilePage;
