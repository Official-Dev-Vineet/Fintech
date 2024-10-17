const express = require("express");
const { locationMiddleware, verifyUserToken } = require("../middleware");
const { sendOtp, verifyOtp, kyc, userProfileUpdate, login, verifyLoginOtp, checkBalance, fetchProfilePic, uploadProfilePic } = require("../controller/user");
const multer = require("multer");
const path = require("path")

const userRouter = express.Router();

userRouter.post("/sendOtp", locationMiddleware, sendOtp)
userRouter.post("/verifyOtp", verifyOtp)

const kycDocument = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/kycDocument"))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const userProfile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/userProfile"))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
userRouter.post("/userProfile", multer({ storage: userProfile }).single("userProfileImage"), userProfileUpdate)
userRouter.post("/kycDocument", multer({
    storage: kycDocument.storage
}).fields([{ name: "AadharCardImage", maxCount: 1 }, { name: "panCardImage", maxCount: 1 }]), kyc)

userRouter.post("/login", locationMiddleware, login)
userRouter.post("/verifyLoginOtp", locationMiddleware, verifyLoginOtp)
userRouter.post("/checkBalance", verifyUserToken, checkBalance)
userRouter.post("/profilePic",verifyUserToken, fetchProfilePic)
userRouter.post("/updateProfilePic",verifyUserToken, multer({ storage: userProfile }).single("updateProfilePic"), uploadProfilePic)

module.exports = userRouter;