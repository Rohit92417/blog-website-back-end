const Blog = require("../models/blog");
const user = require("../models/user");
const cloudinary = require("../utils/cloudinary");

//ADD NEW BLOG
exports.add = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const newBlog = await new Blog({
      title: req.body.title,
      description: req.body.description,
      blog_image: result.secure_url,
    }).save();

    res.status(200).json(newBlog);
  } catch (error) {
    res.status(500).json("something went wrong");
  }
};

//UPDATE EXISTING BLOG
exports.edit = async (req, res) => {
  try {
    let newImage = "";
    const blog = await Blog.findById(req.params.id);
    if (req.file) {
      let url = blog.blog_image.split("/")[7];
      let secure_url = url.split(".")[0];
      await cloudinary.uploader.destroy(secure_url);
      newImage = await cloudinary.uploader.upload(req.file.path);
    }
    const data = {
      title: req.body.title || blog.title,
      description: req.body.description || blog.description,
      blog_image: newImage.secure_url || blog.blog_image,
    };
    await Blog.findByIdAndUpdate(req.params.id, data, {
      $new: true,
    });
    res.status(201).json({ message: "Blog update successfully" });
  } catch (error) {
    res.status(500).json("something went wrong");
  }
};

//DELETE EXISTING BLOG
exports.delete = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    let url = blog.blog_image.split("/")[7];
    let secure_url = url.split(".")[0];
    await cloudinary.uploader.destroy(secure_url);
    await blog.remove();
    res.status(201).json({ blog, message: "Blog delete successfully" });
  } catch (error) {
    res.status(500).json("something went wrong");
  }
};

//GET ALL BLOG
exports.view = async (req, res) => {
  try {
    const getAllBlog = await Blog.find();
    res.status(201).json(getAllBlog);
  } catch (error) {
    res.status(500).json("something went wrong");
  }
};
