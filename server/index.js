const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const connection = require("./db/connection");

dotenv.config();
app.use(cors({
    origin: "*",
}));

app.use(morgan('dev'));
connection()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
})
// my api's routes
app.use("/admin", require("./routes/admin"));
app.use("/payment", require("./routes/payment"));
app.use("/user", require("./routes/user"));

app.listen("5000", () => {
    console.log("Backend server is running! http://localhost:5000");
});

