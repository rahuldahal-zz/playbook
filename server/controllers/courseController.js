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

exports.getAll = (req, res) => {
  Course.find({})
    .sort("title")
    .then((courses) => res.status(200).json(courses))
    .catch((err) => res.status(500).json({ error: err }));
};

exports.editOne = (req, res) => {
  if (!req.body._id) {
    return res.status(400).json({
      error: "The 'id' of targeted course is not present in request body.",
    });
  }

  if (Object.keys(req.body).length < 2) {
    return res.status(400).json({
      error: "The request body doesn't contain required data-fields",
    });
  }

  const newData = req.body;

  // todo: validation of req.body

  newData.updatedDate = Date.now();

  Course.findOneAndUpdate({ _id: req.body._id }, newData, {
    returnOriginal: false,
    useFindAndModify: false,
  })
    .then((updatedCourse) => {
      if (updatedCourse) {
        return res.status(201).json(updatedCourse);
      }
      return res
        .status(400)
        .json({ error: "The targeted course is not found." });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

function createNew(data, res) {
  const course = new Course(data);
  course
    .save()
    .then((newCourse) => res.json(newCourse))
    .catch((err) => res.status(500).send(err));
  course.logThis();
}
