import validator from "indicative/validator.js";
import { errorJson, successJson } from "../utils/JsonResponse.js";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = (req, res) => {
    res.send("Login Controller");
};

export const register = async (req, res) => {
    try {
        // check email already exits
        const { name, email, password } = req.body;
        const checkUser = await UserModel.findOne({ email });
        if (checkUser) {
            return res
                .status(409)
                .json(errorJson("Email already exists!", null));
        }

        // validation process
        validator
            .validateAll(req.body, {
                name: "min:3 | required",
                email: "email | required",
                password: "required | min:3 | max: 20",
            })
            .then(async () => {
                // hashing password
                const saltRound = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(password, saltRound);

                // insert data in DB
                const createdUser = await UserModel.create({
                    name,
                    email,
                    password: hashedPassword,
                });

                // jwt process
                const secretKey = process.env.JWT_SECRET;
                const access_token = jwt.sign(
                    { _id: createdUser._id, name },
                    secretKey
                );
                res.cookie("access_token", access_token, { httpOnly: true });
                return res
                    .status(201)
                    .json(successJson("Register Successfully!", null));
            })
            .catch(error => {
                return res
                    .status(400)
                    .json(errorJson("Validation Failed!", error));
            });
    } catch (error) {
        return res.status(500).json(errorJson(error.message, null));
    }
};
