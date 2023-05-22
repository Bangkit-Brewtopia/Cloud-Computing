const router = require("express").Router();
const userControllers = require("../controllers/userControllers");

// Routes for user-related operations
router.post("/signup", userControllers.signUp);
router.post("/signin", userControllers.signIn);
router.get("/logout", userControllers.logout);
router.put("/edit-profile", userControllers.editProfile);
router.post("/upload-profile-picture", userControllers.uploadProfilePicture);

module.exports = router;
