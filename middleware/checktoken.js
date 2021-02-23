const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "Alkoran");
    req.userData = decode;
    next();
  } catch (e) {
    res.status(404);
    return res.json({
      message: "token expired !",
    });
  }
};
