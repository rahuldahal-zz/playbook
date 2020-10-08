const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

exports.mustHaveToken = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = User.toObjectId(decoded.userId);

      User.findById(userId)
        .select("-password")
        .then((user) => {
          if (user) {
            req.user = user;
            return next();
          }
          throw "The user is not found";
        })
        .catch((err) => next(err));
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

exports.grantAccess = (req, res) => {
  res.status(202).json(req.user);
};
