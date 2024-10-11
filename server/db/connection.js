const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

async function connection() {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected: ", db.connection.name);
    } catch (error) {
        console.log(error);
    } 
}
module.exports = connection;