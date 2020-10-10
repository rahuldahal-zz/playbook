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
      next();
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
    .then(() => updateUserProfile(req, res, data))
    .catch((err) => res.status(400).send(err));
};

function updateUserProfile(req, res, data) {
  User.findOneAndUpdate({ _id: req.userId }, data, {
    returnOriginal: false,
    useFindAndModify: false,
  })
    .select("-password")
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(500));
}
