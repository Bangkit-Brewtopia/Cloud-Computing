const firebase = require("firebase/compat/app");
require("firebase/compat/auth");
require("firebase/compat/firestore");

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

    res.json({ message: "Signup successful", user });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const token = await user.user.getIdToken();
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: error.message });
  }
};

const logout = (req, res) => {
  firebase.auth().signOut();
  res.json({ message: "Logout successful" });
};

module.exports = {
  signUp,
  signIn,
  logout,
};
