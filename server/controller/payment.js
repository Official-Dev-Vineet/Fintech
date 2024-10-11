const dotenv = require("dotenv");
const Payment = require("../model/payment");
const crypto = require('crypto');
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

function encryptWithoutIV(data, key=process.env.ENCRYPTION_KEY) {
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}


const payment = async (req, res) => {
    try {
        const reqIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        if (!reqIp) {
            return res.status(403).json({ message: "IP not found", success: false, code: 403 });
        }
        const { amountPay, cardNo } = req.body;
        const userId = req.user._id;
        console.log(reqIp);
        console.log(encryptWithoutIV(cardNo))
        const cardPaymentUrl = "https://api.instantpay.in/payments/payout";
        const transId = "CBC" + crypto.randomBytes(16).toString("hex");
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
                "accountNumber": encryptWithoutIV(cardNo),
                "name": "Instantpay"
            },
            "transferMode": "CREDITCARD",
            "transferAmount": amountPay,
            "externalRef": transId,
            "latitude": "22.5726",
            "longitude": "78.9628",
            "remarks": "Credit Card BILL",
            "alertEmail": "viratsinghkaharwar8923@gmail.com"
        };

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

        // Save payment data to database
        const newPayment = new Payment({
            userId: userId,
            amount: amountPay,
            paymentType: "Credit Card",
            paymentDate: Date.now(),
            location: {
                latitude: payLoad.latitude,
                longitude: payLoad.longitude
            },
            status: "pending", // You might want to update this based on the response status
            transactionId: transId,
            requestPayLoad: JSON.stringify(payLoad), // Store request payload
            apiResponse: data, // Store response from Instantpay API
            paymentTypeReq: "outgoing",
            remark: payLoad.remarks,
            payerInfo: payLoad.payer,
            payeeInfo: payLoad.payee,
            cardNo: cardNo // Storing the card number, encrypt this if necessary
        });

        await newPayment.save(); // Save the new payment to the database

        res.status(200).json({ data, success: true, code: 200, cardNo: encryptWithoutIV(cardNo) });
    }
    catch (err) {
        res.status(500).json({ message: err.message, success: false, code: 500 });
    }
};
module.exports = {
    payment
}