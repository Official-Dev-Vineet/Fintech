const express = require("express");
const { payment } = require("../controller/payment");
const { verifyToken } = require("../middleware");
const paymentRouter = express.Router();



paymentRouter.post("/creditCard", verifyToken, payment)

module.exports = paymentRouter