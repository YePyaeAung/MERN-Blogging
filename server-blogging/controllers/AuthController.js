import validator from "indicative/validator.js";
import { errorJson, successJson } from "../utils/JsonResponse.js";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const checkAuth = (req, res) => {
    const { access_token } = req.cookies;
    const secretKey = process.env.JWT_SECRET;
    jwt.verify(access_token, secretKey, (err, data) => {
        if (err) {
            return res.json(errorJson("Not Auth!", err));
        }
        return res.json(successJson("Authentication Successful!", data));
    });
};

export const login = async (req, res) => {
    // validation process

    const validateLoginInput = async payload => {
        const rules = {
            email: "email | required",
            password: "required | min:3 | max:20",
        };
        const messages = {
            "name.required": "Please choose a unique username for your account",
            "email.required": "Enter a valid email address.",
            "password.required": "Enter a valid password.",
            "password.min": "The password must be at least 3 characters long.",
        };
        await validator.validateAll(payload, rules, messages);
    };

    const generateToken = (userId, userName) => {
        const secretKey = process.env.JWT_SECRET;
        return jwt.sign({ _id: userId, name: userName }, secretKey);
    };

    try {
        // validation process
        await validateLoginInput(req.body);

        const { email, password } = req.body;
        // check user email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.json(errorJson("Email Not Found!", null));
        }
        // check password
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
            return res.json(errorJson("Wrong Password!", null));
        }
        // jwt process
        const access_token = generateToken(user._id, user.name);
        res.cookie("access_token", access_token, { httpOnly: true });
        // remove user email & password response
        const userData = { ...user.toObject() };
        delete userData.email;
        delete userData.password;
        return res
            .status(200)
            .json(successJson("Login Successfully!", userData));
    } catch (error) {
        return res.json(errorJson("Validation Failed!", error));
    }
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

export const logout = (req, res) => {
    res.clearCookie("access_token");
    res.json(successJson("Logout Successfully!", null));
};

// export const removeAccount = async (req, res) => {
//     const validateInput = async payload => {
//         const rules = {
//             email: "email | required",
//             password: "required | min:3 | max:20",
//         };
//         const messages = {
//             "email.required": "Enter a valid email address.",
//             "password.required": "Enter a valid password.",
//             "password.min": "The password must be at least 3 characters long.",
//         };
//         await validator.validateAll(payload, rules, messages);
//     };
//     try {
//         // validation
//         await validateInput(req.body);
//         // check user email
//         const { email, password, authUser } = req.body;
//         // res.json(authUser);
//         const user = await UserModel.findOne({ email });
//         if (!user) {
//             return res.json(errorJson("User Not Found!", null));
//         }
//         // check password
//         const checkPassword = await bcrypt.compare(password, user.password);
//         // res.json(checkPassword)
//         if (!checkPassword) {
//             return res.json(errorJson("Wrong Password!", null));
//         } else {
//             if (user._id == authUser._id) {
//                 await UserModel.findByIdAndDelete({ _id: authUser._id });
//                 res.clearCookie("access_token");
//                 return res.json(
//                     successJson("Account Deleted Successfully!", null)
//                 );
//             } else {
//                 return res.json(errorJson("This is NOT Your Account!", null));
//             }
//         }
//     } catch (error) {
//         return res.json(errorJson("Validation Failed!", error));
//     }
// };
