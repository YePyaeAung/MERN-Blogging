const ArticleListsPage = () => {
    return (
        <>
            <div className="row mt-5">
                {/* article list */}
                <div className="col-12 mt-3">
                    <div className="card bg-dark d-flex flex-row">
                        <img
                            src="../../../public/images/1.webp"
                            alt=""
                            className="w-50"
                        />
                        <div className="ml-3 p-3">
                            <h3 className="text-white">What is FullStack?</h3>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex">
                                    <span className="text-success mr-2">
                                        <i className="bx bx-happy-heart-eyes" />
                                    </span>
                                    100
                                </div>
                                <div className="d-flex">
                                    <span className="text-success mr-2">
                                        <i className="bx bx-heart text-danger" />
                                    </span>
                                    100
                                </div>
                                <div className="d-flex">
                                    <span className="text-success mr-2">
                                        <i className="bx bx-message-square-dots text-primary" />
                                    </span>
                                    100
                                </div>
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit....
                            </p>
                            <a
                                href="#"
                                className="btn btn-secondary float-right"
                            >
                                View
                            </a>
                        </div>
                    </div>
                </div>
                {/* article list */}
                <div className="col-12 mt-3">
                    <div className="card bg-dark d-flex flex-row">
                        <img
                            src="../../../public/images/1.webp"
                            alt=""
                            className="w-50"
                        />
                        <div className="ml-3 p-3">
                            <h3 className="text-white">What is FullStack?</h3>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex">
                                    <span className="text-success mr-2">
                                        <i className="bx bx-happy-heart-eyes" />
                                    </span>
                                    100
                                </div>
                                <div className="d-flex">
                                    <span className="text-success mr-2">
                                        <i className="bx bx-heart text-danger" />
                                    </span>
                                    100
                                </div>
                                <div className="d-flex">
                                    <span className="text-success mr-2">
                                        <i className="bx bx-message-square-dots text-primary" />
                                    </span>
                                    100
                                </div>
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit....
                            </p>
                            <a
                                href="#"
                                className="btn btn-secondary float-right"
                            >
                                View
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* load more button */}
            <div className="col-12 mt-5">
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">Load More</button>
                </div>
            </div>
        </>
    );
};

export default ArticleListsPage;
