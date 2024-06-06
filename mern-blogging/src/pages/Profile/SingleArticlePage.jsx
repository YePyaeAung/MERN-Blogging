import { useNavigate } from "react-router-dom";
import globalUrl from "../../data/globalUrl";
import Master from "../layout/Master";

const SingleArticlePage = () => {
    const navigate = useNavigate();

    return (
        <Master>
            <div className="row">
                <div className="col-12 card bg-dark p-3">
                    <div className="d-flex">
                        <img
                            className="col-12"
                            // src={`${globalUrl.host}/images/${}`}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/800px-Laravel.svg.png"
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
                                Article Name
                            </h3>
                            <div className="col-3 d-flex justify-content-between">
                                <div className="d-flex">
                                    <span className="text-success mr-2">
                                        <i className="bx bx-happy-heart-eyes" />
                                    </span>
                                    <div>0</div>
                                </div>
                                <div className="d-flex">
                                    <span className="text-success mr-2">
                                        <i className="bx bx-heart text-danger" />
                                    </span>
                                    <div>0</div>
                                </div>
                                <div className="d-flex">
                                    <span className="text-success mr-2">
                                        <i className="bx bx-message-square-dots text-primary" />
                                    </span>
                                    <div>0</div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="col-6">
                                <h6 className="text-primary">Tags</h6>
                                <span className="btn btn-sm btn-dark mt-2">
                                    နည်းလမ်းများ
                                </span>
                                <span className="btn btn-sm btn-dark mt-2">
                                    နည်းလမ်းများ
                                </span>
                                <span className="btn btn-sm btn-dark mt-2">
                                    နည်းလမ်းများ
                                </span>
                                <span className="btn btn-sm btn-dark mt-2">
                                    နည်းလမ်းများ
                                </span>
                                <span className="btn btn-sm btn-dark mt-2">
                                    နည်းလမ်းများ
                                </span>
                                <span className="btn btn-sm btn-dark mt-2">
                                    နည်းလမ်းများ
                                </span>
                            </div>
                            <div className="col-6">
                                <h6 className="text-primary">Programming</h6>
                                <span className="btn btn-sm btn-dark mt-2">
                                    နည်းလမ်းများ
                                </span>
                                <span className="btn btn-sm btn-dark mt-2">
                                    နည်းလမ်းများ
                                </span>
                                <span className="btn btn-sm btn-dark mt-2">
                                    နည်းလမ်းများ
                                </span>
                                <span className="btn btn-sm btn-dark mt-2">
                                    နည်းလမ်းများ
                                </span>
                                <span className="btn btn-sm btn-dark mt-2">
                                    နည်းလမ်းများ
                                </span>
                                <span className="btn btn-sm btn-dark mt-2">
                                    နည်းလမ်းများ
                                </span>
                            </div>
                        </div>
                        <div className="col-12 my-5">
                            <p className="">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Optio, pariatur quisquam
                                corrupti voluptatibus voluptates error ullam
                                earum. Est repudiandae necessitatibus deleniti
                                consectetur non at nesciunt veniam nisi nobis,
                                natus cum?
                            </p>
                        </div>
                        <div className="col-12">
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    navigate(-1);
                                }}
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Master>
    );
};

export default SingleArticlePage;
