const express = require("express");
const { payment } = require("../controller/payment");
const { verifyToken } = require("../middleware");
const { sendEmail } = require("../mail");
const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();

const paymentRouter = express.Router();

// POST: Process credit card payments with token verification middleware
paymentRouter.post("/creditCard", verifyToken, payment);

// POST: Generate Token for Payment
paymentRouter.post("/generateToken", async (req, res) => {
    try {
        const apiUrl = "https://api.runpaisa.com/token";
        // const apiUrl = "https://dev.api.runpaisa.com/token";
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                client_id: process.env.R_CLIENT_ID,
                username: process.env.R_USERNAME,
                password: process.env.R_PASSWORD,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to generate token: ${response.statusText}`);

        }

        const result = await response.json();

        res.status(200).json({ data: result });
    } catch (error) {
        console.error("Error generating token:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});

// POST: Add Money via Payment Gateway
paymentRouter.post("/addMoney", async (req, res) => {
    try {
        const { token, amount, remarks } = req.body;
        console.log(token);
        // Validate that token is provided
        if (!token) {
            return res.status(400).json({ error: "Token is required" });
        }
        const apiUrl = "https://api.pg.runpaisa.com/order";
        // const apiUrl = "https://test.api.pg.runpaisa.com/order";
        const orderID = `CHAGANS${crypto.randomBytes(4).toString("hex")}`.toLocaleUpperCase();
        const formData = new FormData();
        formData.append("amount", amount);
        formData.append("order_id", orderID);
        formData.append("callbackurl", "https://chagans.com/payment/verify");
        formData.append("merc_unq_ref", remarks || "");

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "client_id": process.env.R_CLIENT_ID,
                "token": token,
            },
            body: formData,
        });
        console.log(req.body);
        if (!response.ok) {
            throw new Error(`Failed to create order: ${response.statusText}`);
        }

        const result = await response.json();

        // Optionally send email to notify of the transaction
        // await sendEmail(
        //     "sy241527@gmail.com", // Receiver's email
        //     process.env.GMAIL_ID, // Sender's email
        //     "payment info",
        //     `Order response: ${JSON.stringify(result)}`
        // );

        res.status(200).json({ result });
    } catch (error) {
        console.error("Error adding money:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});

// POST: Payment Verification
paymentRouter.post("/verify", async (req, res) => {
    try {
        // Log incoming post data for debugging
        console.log("Verification Data:", req.body);

        // Handle the verification logic here
        // Assuming req.body contains the necessary data for verification

        res.status(200).json({ data: req.body });
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ error: "Payment verification failed" });
    }
});

module.exports = paymentRouter;





