const router = require("express").Router();
const articleControllers = require("../controllers/articleControllers");

router.get("/", articleControllers.getArticles);
router.get("/:id", articleControllers.getArticleByID);

module.exports = router;