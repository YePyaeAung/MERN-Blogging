import LanguageModel from "../models/LanguageModel.js";
import TagModel from "../models/TagModel.js";
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
};

export default DataController;
