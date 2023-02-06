/**
 * Module dependencies.
 */
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers.token;

  if (token) {
    try {
      const user = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (err) {
      res.status(403).json({ code: 403, msg: "Token is not valid" });
    }
  } else {
    res.status(401).json({ code: 401, msg: "You're not authenticated" });
  }
};

const verifyTokenAdmin = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.roles == 0 || req.user.username == req.params.username) {
      next();
    } else {
      res
        .status(403)
        .json({ code: 403, msg: "You're not allowed to delete other" });
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAdmin,
};
