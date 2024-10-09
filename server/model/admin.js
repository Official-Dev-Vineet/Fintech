const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
    {
        __id: mongoose.Schema.Types.ObjectId,
        email: {
            type: String,
            required: true,
            default: "sy241527@gmail.com",
            unique: true
        },
        companyName: {
            type: String,
            required: true,
            default: "Chagans Technologies Limited",
        },
        phoneNumber: {
            type: Number,
            required: true,
            default: 1234567890
        },
        address: {
            type: String,
            default: "Chagans Business Centre SCO-4 Sector-39 Dayal Bagh Marg- Faridabad 121009 (Haryana)"
        },
        role: {
            type: String,
            default: "admin"
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        loginAt: {
            type: Array,
            default: []
        },
        blockedAt:{
            type: Array,
            default: [] 
        }
    });

const Admin = mongoose.model("Admin", adminSchema)

module.exports = Admin