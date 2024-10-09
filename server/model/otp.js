const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    __id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true,
        unique: true
    },
    totalAccess: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // 5 minutes
    }
});

const Otp = mongoose.model("Otp", otpSchema);
module.exports = Otp 