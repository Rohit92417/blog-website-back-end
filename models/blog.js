const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  blog_image: { type: String, require: true },
});

module.exports = mongoose.model("Blog", blogSchema);
