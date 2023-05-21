const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
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

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
