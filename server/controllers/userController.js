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
      req.userId = User.toObjectId(decoded.userId);
      return next();
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Authorization token is not valid..." });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization token is not present..." });
  }
};

exports.mustBeAdmin = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      if (user && user.isAdmin) {
        return next();
      }
      return res
        .status(401)
        .json({ message: "Administrator authorization needed..." });
    })
    .catch((err) => next(err));
};

exports.createProfile = (req, res) => {
  const data = ({
    companyName,
    companyIndustry,
    productType,
    areasOfStruggle,
    annualRevenue,
  } = req.body);

  const user = new User();

  user
    .isCreateProfileDataValid(data)
    .then(() => updateUserProfile({ _id: req.userId }, data, res))
    .catch((err) => res.status(400).send(err));
};

exports.getAll = (req, res) => {
  User.find({})
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).json({ error: err }));
};

exports.makeAdmin = (req, res) => {
  const userId = req.body.userId;
  if (!userId || !User.isObjectId(userId)) {
    return res.status(400).send("invalid user ID provided");
  }
  return updateUserProfile({ _id: userId }, { isAdmin: true }, res);
};

exports.removeAdmin = (req, res) => {
  const userId = req.body.userId;
  if (!userId || !User.isObjectId(userId)) {
    return res.status(400).send("invalid user ID provided");
  }
  return updateUserProfile({ _id: userId }, { isAdmin: false }, res);
};

function updateUserProfile(filter, data, res) {
  User.findOneAndUpdate(filter, data, {
    returnOriginal: false,
    useFindAndModify: false,
  })
    .select("-password")
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(500));
}
