import validator from "indicative/validator.js";
import { errorJson, successJson } from "../utils/JsonResponse.js";

export const login = (req, res) => {
    res.send("Login Controller");
};

export const register = (req, res) => {
    validator
        .validateAll(req.body, {
            name: "min:3 | required",
            email: "email | required",
            password: "required | min:3 | max: 20",
        })
        .then(data => {
            return res.json(successJson("Validation Passed!", data));
        })
        .catch(error => {
            return res.json(errorJson("Validation Failed!", error));
        });
};
