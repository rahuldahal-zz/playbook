const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const courseSchema = new Schema({
  createdDate: { type: Date, default: Date.now },
  title: String,
  description: String,
  videoLink: String,
  thumbnailLink: {
    type: String,
    default: "https://genericThubnail.com/random.png",
  },
  tags: Array,
});

courseSchema.methods.logThis = function () {
  console.log(this);
};

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
