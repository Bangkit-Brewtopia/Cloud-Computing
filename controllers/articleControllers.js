const firebase = require("firebase/compat/app");
require("firebase/compat/firestore");

const getArticles = async (req, res) => {
  try {
    const articleId = "FdwOpeqA59D1htoaKfi4";
    const articleRef = firebase
      .firestore()
      .collection("articles")
      .doc(articleId);
    const articleSnapshot = await articleRef.get();

    if (articleSnapshot.exists) {
      const articleData = articleSnapshot.data();
      res.status(200).json({
        error: false,
        message: "Articles fetched successfully",
        articles: articleData,
      });
    } else {
      res.status(404).json({ error: false, message: "Article not found" });
    }
  } catch (error) {
    console.error("Error retrieving article:", error);
    res.status(500).json({ error: true, message: error.message });
  }
};

const getArticleByID = async (req, res) => {
  try {
    const articleId = "FdwOpeqA59D1htoaKfi4";
    const articleRef = firebase
      .firestore()
      .collection("articles")
      .doc(articleId);
    const articleSnapshot = await articleRef.get();

    if (articleSnapshot.exists) {
      const articleData = articleSnapshot.data();
      res.status(200).json({
        error: false,
        message: "Article fetched successfully",
        article: articleData.data[req.params.id - 1],
      });
    } else {
      res.status(404).send({ error: false, message: "Article not found" });
    }
  } catch (error) {
    console.error("Error retrieving article:", error);
    res.status(500).json({ error: true, message: error.message });
  }
};

module.exports = {
  getArticles,
  getArticleByID,
};
