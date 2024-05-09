export const login = (req, res) => {
    res.send("Login Controller");
};

export const register = (req, res) => {
    console.log(req.body);
    return res.json(req.body);
};
