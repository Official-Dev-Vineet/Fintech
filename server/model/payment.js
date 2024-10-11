const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({

    __id: mongoose.Schema.Types.ObjectId,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    },
    amount: {
        type: Number,
        required: true
    },
    paymentType: {
        type: String,
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
    location: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    transactionId: {
        type: String,
        required: true,
        unique: true
    },
    requestPayLoad: {
        type: String
    },
    apiResponse: {
        type: Object
    },
    paymentTypeReq: {
        type: String,
        default: "outgoing"
    },
    remark: {
        type: String
    },
    payerInfo: {
        type: Object
    },
    payeeInfo: {
        type: Object
    }
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment


