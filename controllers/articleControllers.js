const firebase = require("firebase/compat/app");
require("firebase/compat/firestore");

const getArticle = async (req, res) => {
  try {
    const articleId = "FdwOpeqA59D1htoaKfi4";
    const articleRef = firebase.firestore().collection("articles").doc(articleId);
    const articleSnapshot = await articleRef.get();

    if (articleSnapshot.exists) {
      const articleData = articleSnapshot.data();
      // Do something with the article data
      res.status(200).json(articleData);
    } else {
      // Document doesn't exist
      res.status(404).send("Article not found");
    }
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error("Error retrieving article:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  getArticle
};
