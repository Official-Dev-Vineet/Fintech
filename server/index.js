const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

const connection = require("./db/connection");

dotenv.config();
app.use(cors({
    origin: "*",
}));


connection()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client/build")));

// my api's routes
app.use("/admin", require("./routes/admin"));

app.listen("5000", () => {
    console.log("Backend server is running! http://localhost:5000");
});

