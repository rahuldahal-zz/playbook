exports.mustBeLoggedIn = (req, res, next) => {
  console.log(req.session.user);
  res.send("<h1>Hello</h1>");
};
