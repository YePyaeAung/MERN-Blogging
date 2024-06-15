import MenuBar from "../../components/MenuBar";
import MostLoveArticles from "../../components/MostLoveArticles";
import MostTrendingArticles from "../../components/MostTrendingArticles";
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
                    {/* Most Trending Articles (Most View) */}
                    <MostTrendingArticles />
                    {/* Most Love Articles (Most Like) */}
                    <MostLoveArticles />
                </div>
            </div>
        </div>
    );
};

export default Master;
