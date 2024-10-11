const express = require("express");
const { login, register, verifyOtp } = require("../controller/admin");
const { locationMiddleware } = require("../middleware");

const adminRouter = express.Router();



adminRouter.post("/login", locationMiddleware, login)
adminRouter.post("/verifyOtp", verifyOtp)
adminRouter.post("/register", register)



module.exports = adminRouter 