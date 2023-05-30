const firebase = require("firebase/compat/app");
require("firebase/compat/firestore");

const getArticles = async (req, res) => {
  try {
    const articleId = "FdwOpeqA59D1htoaKfi4";
    const articleRef = firebase.firestore().collection("articles").doc(articleId);
    const articleSnapshot = await articleRef.get();

    if (articleSnapshot.exists) {
      const articleData = articleSnapshot.data();
      res.status(200).json(articleData);
    } else {
      res.status(404).send("Article not found");
    }
  } catch (error) {
    console.error("Error retrieving article:", error);
    res.status(500).send("Internal server error");
  }
};

const getArticleByID = async (req, res) => {
  try {
    const articleId = "FdwOpeqA59D1htoaKfi4";
    const articleRef = firebase.firestore().collection("articles").doc(articleId);
    const articleSnapshot = await articleRef.get();

    if (articleSnapshot.exists) {
      const articleData = articleSnapshot.data();
      res.status(200).json(articleData.data[req.params.id-1]);
    } else {
      res.status(404).send("Article not found");
    }
  } catch (error) {
    console.error("Error retrieving article:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  getArticles,
  getArticleByID
};
