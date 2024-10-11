const crypto = require("crypto");
const dotenv = require("dotenv");
const Payment = require("../model/payment");
dotenv.config();
// Custom XOR decryption function
const customDecrypt = (encryptedData, key) => {
    let result = "";
    const decodedData = atob(encryptedData); // Decode the Base64 string
    for (let i = 0; i < decodedData.length; i++) {
        // XOR each character with the key to decrypt
        result += String.fromCharCode(decodedData.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
};

const encryptCardData = (data) => {
    const key = crypto.randomBytes(32); // You can replace this with a constant key from config
    const algorithm = "aes-256-cbc";
    const iv = crypto.randomBytes(16); // Initialization vector for AES-256-CBC (16 bytes)

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(data, "utf8", "base64");
    encrypted += cipher.final("base64");

    // Return the IV and encrypted data (IV is required for decryption)
    return iv.toString("base64") + ":" + encrypted;
};

const payment = async (req, res) => {
    const reqIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    if (!reqIp) {
        return res.status(403).json({ message: "IP not found", success: false, code: 403 });
    }
    console.log(reqIp);
    const { amountPay, cardNo } = req.body;
    const userId = req.user._id;
    try {
        const cardPaymentUrl = "https://api.instantpay.in/payments/payout"

        const payLoad = {
            "payer": {
                "bankId": "0",
                "bankProfileId": "0",
                "accountNumber": "9971230022",
                "name": "ChagansBusinessCenter",
                "paymentMode": "NETBANKING",
                "cardNumber": "",
            },
            "payee": {
                "accountNumber": encryptCardData(cardNo),
                "name": "Instantpay"
            },
            "transferMode": "CREDITCARD",
            "transferAmount": amountPay,
            "externalRef": "BILLPAY1",
            "latitude": "22.5726",
            "longitude": "78.9628",
            "remarks": "Credit Card BILL",
            "alertEmail": "viratsinghkaharwar8923@gmail.com"
        }

        const response = await fetch(cardPaymentUrl, {
            method: "POST",
            body: JSON.stringify(payLoad),
            headers: {
                'X-Ipay-Auth-Code': 1,
                'X-Ipay-Client-Id': process.env.IPAY_CLIENT_ID,
                'X-Ipay-Client-Secret': process.env.IPAY_CLIENT_SECRET,
                'X-Ipay-Endpoint-Ip': reqIp.toString().split(",")[0],
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Failed to process payment.");
        }

        const data = await response.json();
        res.status(200).json({ data, success: true, code: 200 });
    }
    catch (err) {
        res.status(500).json({ message: err.message, success: false, code: 500 });
    }
};

module.exports = {
    payment
}