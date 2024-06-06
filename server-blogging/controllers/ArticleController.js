import slug from "slug";
import ArticleModel from "../models/ArticleModel.js";
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

export const all = async (req, res) => {
    try {
        const { page } = req.query;
        const limit = 5;
        const skip = (page - 1) * limit;
        const articles = await ArticleModel.find().limit(limit).skip(skip);
        const articleCount = await ArticleModel.countDocuments();
        const totalPage = Math.ceil(articleCount / limit);
        res.json(
            successJson("Get Articles Successfully!", { totalPage, articles })
        );
    } catch (error) {
        res.json(errorJson(error.message, null));
    }
};

export const store = async (req, res) => {
    try {
        const { files, body } = req;
        // upload image
        const fileName = files.image.name;
        const filePath = "public/images/" + fileName;
        files.image.mv(filePath);
        // prepare for tags
        const tags = JSON.parse(body.selectedTags);
        const tagsQuery = [];
        tags.map(tag => {
            tagsQuery.push({ slug: tag.value });
        });
        const findTags = await TagModel.find({
            $or: tagsQuery,
        });
        // prepare for languages
        const languages = JSON.parse(body.selectedLanguages);
        const languagesQuery = [];
        languages.map(language => {
            languagesQuery.push({ slug: language.value });
        });
        const findLanguages = await LanguageModel.find({
            $or: languagesQuery,
        });
        // article store
        const article = await ArticleModel.create({
            slug: slug(body.title),
            title: body.title,
            image: fileName,
            tags: findTags,
            languages: findLanguages,
            description: body.description,
        });
        res.json(successJson("Article Created!", article));
    } catch (error) {
        res.json(errorJson(error.message, null));
    }
};

export const edit = async (req, res) => {
    try {
        const { slug } = req.params;
        const article = await ArticleModel.findOne({ slug });
        res.json(successJson("Get Article Successfully!", article));
    } catch (error) {
        res.json(errorJson(error.message, null));
    }
};

export const update = async (req, res) => {
    try {
        const { files, body, params } = req;
        const dbData = await ArticleModel.findOne({ slug: params.slug });
        if (files) {
            // upload image
            var fileName = files.image.name;
            const filePath = "public/images/" + fileName;
            files.image.mv(filePath);
        } else {
            fileName = dbData.image;
        }
        // prepare for tags
        const tags = JSON.parse(body.selectedTags);
        const tagsQuery = [];
        tags.map(tag => {
            tagsQuery.push({ slug: tag.value });
        });
        const findTags = await TagModel.find({
            $or: tagsQuery,
        });
        // prepare for languages
        const languages = JSON.parse(body.selectedLanguages);
        const languagesQuery = [];
        languages.map(language => {
            languagesQuery.push({ slug: language.value });
        });
        const findLanguages = await LanguageModel.find({
            $or: languagesQuery,
        });
        // article store
        const article = await ArticleModel.findOneAndUpdate(
            { slug: params.slug },
            {
                slug: slug(body.title),
                title: body.title,
                image: fileName,
                tags: findTags,
                languages: findLanguages,
                description: body.description,
            }
        );
        res.json(successJson("Article Updated!", fileName));
    } catch (error) {
        res.json(errorJson(error.message, null));
    }
};

export const destroy = (req, res) => {
    res.json("delete request");
};
