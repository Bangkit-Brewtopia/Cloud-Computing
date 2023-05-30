const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");
const firebase = require("firebase/compat/app");
require("firebase/compat/auth");
const firebaseConfig = require("./config/firebaseConfig");

const app = express();
firebase.initializeApp(firebaseConfig);

//Middleware
app.use(cors());
app.use(express.json());

//Route Middlewares
app.use("/api/user", userRoutes);
app.use("/api/article", articleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
