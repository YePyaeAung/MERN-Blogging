import LanguageModel from "../models/LanguageModel.js";
import TagModel from "../models/TagModel.js";
import { errorJson, successJson } from "../utils/JsonResponse.js";

export const getTagsAndLanguages = async (req, res) => {
    try {
        const tagsData = await TagModel.find();
        const languagesData = await LanguageModel.find();

        const tags = [];
        tagsData.map(tag => {
            tags.push({ value: tag.slug, label: tag.name });
        });

        const languages = [];
        languagesData.map(language => {
            languages.push({
                value: language.slug,
                label: language.name,
            });
        });

        return res.json(
            successJson("Get Tags and Languages Successfully!", {
                tags,
                languages,
            })
        );
    } catch (error) {
        return res.json(errorJson(error.message, null));
    }
};

export const all = (req, res) => {
    res.json("retrieve request");
};

export const store = (req, res) => {
    res.json("store request");
};

export const update = (req, res) => {
    res.json("update request");
};

export const destroy = (req, res) => {
    res.json("delete request");
};
