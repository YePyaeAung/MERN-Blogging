import LanguageModel from "../models/LanguageModel.js";
import TagModel from "../models/TagModel.js";
import ArticleModel from "../models/ArticleModel.js";
import { errorJson, successJson } from "../utils/JsonResponse.js";

const DataController = {
    getTagsLangs: async (req, res) => {
        try {
            const tags = await TagModel.find();
            const langs = await LanguageModel.find();
            return res.json(
                successJson("Get Tags and Languages Successfully!", {
                    tags,
                    langs,
                })
            );
        } catch (error) {
            return res.json(errorJson("Something went wrong!", null));
        }
    },
    getLatestArticles: async (req, res) => {
        try {
            const latest_articles = await ArticleModel.find()
                .limit(4)
                .sort({ _id: -1 });
            return res.json(
                successJson(
                    "Get Latest Articles Successfully!",
                    latest_articles
                )
            );
        } catch (error) {
            return res.json(
                errorJson("Error while getting latest articles!", null)
            );
        }
    },
    getMostTrendingArticles: async (req, res) => {
        try {
            const most_view_articles = await ArticleModel.find()
                .limit(4)
                .sort({ view_count: -1 });
            return res.json(
                successJson(
                    "Get Most View Articles Successfully!",
                    most_view_articles
                )
            );
        } catch (error) {
            return res.json("Error while getting most view articles!", null);
        }
    },
    getMostLoveArticles: async (req, res) => {
        try {
            const most_love_articles = await ArticleModel.find()
                .limit(4)
                .sort({ like_count: -1 });
            return res.json(
                successJson(
                    "Get Most Love Articles Successfully!",
                    most_love_articles
                )
            );
        } catch (error) {
            return res.json(
                errorJson("Error while getting most love articles!", null)
            );
        }
    },
};

export default DataController;