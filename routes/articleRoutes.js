const router = require("express").Router();
const articleControllers = require("../controllers/articleControllers");

router.get("/", articleControllers.getArticle);

module.exports = router;