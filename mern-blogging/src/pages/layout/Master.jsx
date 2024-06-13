import MenuBar from "../../components/MenuBar";
import TagsAndLangs from "../../components/TagsAndLangs";

/* eslint-disable react/prop-types */
const Master = ({ children }) => {
    return (
        <div className="m-5">
            <div className="row">
                <div className="col-8">
                    <h2 className="text-primary bg-card p-2 pl-5 rounded">
                        MERN Fullstack Community Blogging -{" "}
                        <span className="text-success">MMCoder</span>
                    </h2>
                    <div className="bg-card rounded p-5">{children}</div>
                </div>
                <div className="col-4">
                    <div className="bg-card p-3">
                        {/* Menu */}
                        <MenuBar />
                    </div>
                    <TagsAndLangs />
                    <div className="bg-card p-3 mt-4">
                        <h5 className="text-primary"> Top Trending Articles</h5>
                        <div className="row">
                            <div className="col-6">
                                <div className="bg-dark rounded">
                                    <img
                                        src="https://toka.b-cdn.net/wp-content/uploads/2021/11/3d-aesthetics.png"
                                        className="w-100 rounded"
                                        alt=""
                                    />
                                    <p className="text-white text-center p-2">
                                        What is PHP
                                    </p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="bg-dark rounded">
                                    <img
                                        src="https://toka.b-cdn.net/wp-content/uploads/2022/01/black-man-looking-stock-market-exchange-information-computer-crypto-currency.png"
                                        className="w-100 rounded"
                                        alt=""
                                    />
                                    <p className="text-white text-center p-2">
                                        What is PHP
                                    </p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="bg-dark rounded">
                                    <img
                                        src="https://toka.b-cdn.net/wp-content/uploads/2022/01/black-man-looking-stock-market-exchange-information-computer-crypto-currency.png"
                                        className="w-100 rounded"
                                        alt=""
                                    />
                                    <p className="text-white text-center p-2">
                                        What is PHP
                                    </p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="bg-dark rounded">
                                    <img
                                        src="https://toka.b-cdn.net/wp-content/uploads/2021/11/3d-aesthetics.png"
                                        className="w-100 rounded"
                                        alt=""
                                    />
                                    <p className="text-white text-center p-2">
                                        What is PHP
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-card p-3 mt-4">
                        <h5 className="text-primary"> Most Love Articles</h5>
                        <div className="row">
                            <div className="col-6">
                                <div className="bg-dark rounded">
                                    <img
                                        src="https://toka.b-cdn.net/wp-content/uploads/2021/11/3d-aesthetics.png"
                                        className="w-100 rounded"
                                        alt=""
                                    />
                                    <p className="text-white text-center p-2">
                                        What is PHP
                                    </p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="bg-dark rounded">
                                    <img
                                        src="https://toka.b-cdn.net/wp-content/uploads/2022/01/black-man-looking-stock-market-exchange-information-computer-crypto-currency.png"
                                        className="w-100 rounded"
                                        alt=""
                                    />
                                    <p className="text-white text-center p-2">
                                        What is PHP
                                    </p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="bg-dark rounded">
                                    <img
                                        src="https://toka.b-cdn.net/wp-content/uploads/2022/01/black-man-looking-stock-market-exchange-information-computer-crypto-currency.png"
                                        className="w-100 rounded"
                                        alt=""
                                    />
                                    <p className="text-white text-center p-2">
                                        What is PHP
                                    </p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="bg-dark rounded">
                                    <img
                                        src="https://toka.b-cdn.net/wp-content/uploads/2021/11/3d-aesthetics.png"
                                        className="w-100 rounded"
                                        alt=""
                                    />
                                    <p className="text-white text-center p-2">
                                        What is PHP
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Master;
