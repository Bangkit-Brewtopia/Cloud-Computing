const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const getArticles = async (req, res) => {
  try {
    const articleId = "FdwOpeqA59D1htoaKfi4";
    const articleRef = admin.firestore().collection("articles").doc(articleId);
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
    const articleRef = admin.firestore().collection("articles").doc(articleId);
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
  getArticleByID,
};
