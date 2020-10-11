const Course = require("../models/Course");

exports.create = (req, res) => {
  const data = ({
    title,
    description,
    videoLink,
    thumbnailLink,
    tags,
  } = req.body);

  // {} => is a truthy expression. So, "Object.keys(data).length"

  if (!Object.keys(data).length) {
    return res
      .status(400)
      .json({ error: "Data is not provided in req.body..." });
  }
  Course.findOne({ title: data.title })
    .then((course) => {
      if (course) {
        return res
          .status(200)
          .json({ message: "The video with that title already exists." });
      }
      return createNew(data, res);
    })
    .catch((err) => res.status(500).send(err));
};

function createNew(data, res) {
  Course.create(data)
    .then((newCourse) => res.json(newCourse))
    .catch((err) => res.status(500).send(err));
}
