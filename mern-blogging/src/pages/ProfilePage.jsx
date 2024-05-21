import Master from "./layout/Master";
import Select from "react-select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

const ProfilePage = () => {
    const tags = [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
    ];
    const languages = [
        { value: "php", label: "PHP" },
        { value: "javascript", label: "JavaScript" },
        { value: "python", label: "Python" },
    ];

    const customStyles = {
        input: provided => ({
            ...provided,
            backgroundColor: "#15171F",
            color: "white", // Ensure text is visible against the black background
        }),
        multiValue: provided => ({
            ...provided,
            backgroundColor: "#15171F",
            color: "white",
        }),
        control: provided => ({
            ...provided,
            backgroundColor: "#15171F",
            color: "white",
        }),
        placeholder: provided => ({
            ...provided,
            color: "white",
        }),
        singleValue: provided => ({
            ...provided,
            color: "white",
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