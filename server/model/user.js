const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    __id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    email: {
        type: String,
        required: true
    },
    userProfile: {
        type: String
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    kycDocument: {
        type: Object,
    },
    kycStatus: {
        type: String,
        default: "pending"
    },
    logins: {
        type: Array,
        default: []
    },
    blockedAt: {
        type: Array,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    accountDetails: {
        type: Object,
        default: {
            balance: 0,
            walletBalance: 0,
            rateLimit: [],
        }
    },
    walletTransaction: {
        type: Array,
        default: []
    },
    isLoginAllowed: {
        type: Boolean,
        default: true
    },
    isAccountBlocked: {
        type: Boolean,
        default: false
    },
    loadedAmount: {
        type: Array,
        default: []
    },
    companyDetials: {
        type: Object
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User