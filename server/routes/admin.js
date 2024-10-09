const express = require("express");
const { login, register,verifyOtp } = require("../controller/admin");

const adminRouter = express.Router();



adminRouter.post("/login", login)
adminRouter.post("/verifyOtp", verifyOtp)
adminRouter.post("/register", register)



module.exports = adminRouter 