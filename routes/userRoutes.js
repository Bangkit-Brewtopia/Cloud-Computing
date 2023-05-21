const router = require("express").Router();
const userControllers = require("../controllers/userControllers");

// Routes for user-related operations
router.post("/signup", userControllers.signUp);
router.post("/signin", userControllers.signIn);
router.get("/logout", userControllers.logout);

module.exports = router;
