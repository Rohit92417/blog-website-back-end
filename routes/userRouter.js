const router = require("express").Router();
const userController = require("../controllers/authController");
const blogController = require("../controllers/blogController");
const verify = require("../middleware/AuthMidedlerware");
const upload = require("../utils/multer");

//AuthRouter
//User register
router.post("/register", userController.create);
//User login
router.post("/login", userController.login);

//BlogRouter
//insert new Blog
router.post("/add", upload.single("blog_image"), blogController.add);
//Update Blog
router.put("/update/:id", upload.single("blog_image"), blogController.edit);
// //Delete Blog
router.delete("/delete/:id", blogController.delete);
// //Get all Blog
router.get("/blogs", blogController.view);

module.exports = router;