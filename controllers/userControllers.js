const firebase = require("firebase/compat/app");
require("firebase/compat/auth");
require("firebase/compat/firestore");
require("firebase/compat/storage");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const admin = require("firebase-admin");

const signUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    const { user } = userCredential;
    const { uid } = user;

    await user.updateProfile({
      displayName: name,
    });

    const userDocRef = firebase.firestore().collection("users").doc(uid);
    await userDocRef.set({
      name,
      email,
    });

    res.json({ message: "User Created", error: false });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: true, message: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const token = await user.user.getIdToken();
    const userID = await user.user.uid;
    const name = await user.user.displayName;
    res.json({
      error: false,
      message: "success",
      loginResult: {
        userID: userID,
        name: name,
        token: token,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: true, message: error.message });
  }
};

const editProfile = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: true, message: "Unauthorized" });
    }

    const userId = user.uid;

    if (!userId) {
      return res.status(401).json({ error: "User is not authenticated" });
    }

    if (user.displayName !== name) {
      await admin.auth().updateUser(userId, {
        displayName: name,
      });
    }

    if (password) {
      await admin.auth().updateUser(userId, {
        password: password,
      });
    }

    const userDocRef = admin.firestore().collection("users").doc(userId);
    await userDocRef.update({
      name,
    });

    res.json({ message: "Profile updated successfully", error: false });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: true, message: error.message });
  }
};

const uploadProfilePicture = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: true, message: "Unauthorized" });
    }

    const userId = user.uid;

    if (!userId) {
      return res.status(401).json({ error: "User is not authenticated" });
    }

    const { imageUrl } = req.body;

    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    const imageBuffer = Buffer.from(response.data, "binary");

    const storageRef = firebase.storage().ref();
    const folderRef = storageRef.child("profile_pictures");
    const filename = `${uuidv4()}.jpeg`;
    const fileRef = folderRef.child(filename);

    const metadata = {
      contentType: "image/jpeg",
    };

    await fileRef.put(imageBuffer, metadata);
    const downloadUrl = await fileRef.getDownloadURL();

    await admin.auth().updateUser(userId, {
      photoURL: downloadUrl,
    });

    await admin.firestore().collection("users").doc(userId).update({
      photoURL: downloadUrl,
    });

    res.json({
      message: "Profile picture uploaded successfully",
      error: false,
    });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({ error: true, message: error.message });
  }
};

const logout = (req, res) => {
  firebase.auth().signOut();
  res.json({ error: false, message: "Logout successful" });
};

module.exports = {
  signUp,
  signIn,
  logout,
  editProfile,
  uploadProfilePicture,
};
