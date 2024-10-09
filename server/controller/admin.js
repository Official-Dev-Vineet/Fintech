const Admin = require("../model/admin");
const Otp = require("../model/otp");
const { sendEmail } = require("../mail");





const register = async (req, res) => {
    try {
        const { email, companyName, phoneNumber, address, role } = req.body;

        // Check if email already exists
        const emailExists = await Admin.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: "Email already registered", success: false, code: 400 });
        }

        const adminSchema = new Admin({
            email,
            companyName,
            phoneNumber,
            address,
            role
        });
        await adminSchema.save();

        res.status(200).json({ message: "Admin registered successfully", success: true, code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false, code: 500 });
    }
};







const login = async (req, res) => {
    try {
        const emailId = req.body.email;
        const adminData = await Admin.findOne({ email: emailId });

        if (!adminData) {
            return res.status(404).json({ message: "Invalid credentials", success: false, code: 404 });
        }

        // Check if admin is blocked
        const lastBlockedTime = adminData.blockedAt.length > 0
            ? adminData.blockedAt[adminData.blockedAt.length - 1].date
            : null;

        const blockDuration = 900000; // 15 minutes in milliseconds
        const currentTime = new Date().getTime();

        if (lastBlockedTime && lastBlockedTime > new Date(currentTime - blockDuration)) {
            const timeElapsedSinceBlock = currentTime - new Date(lastBlockedTime).getTime();
            const remainingBlockTime = blockDuration - timeElapsedSinceBlock; // in milliseconds
            const remainingMinutes = Math.floor(remainingBlockTime / 60000);
            const remainingSeconds = Math.floor((remainingBlockTime % 60000) / 1000);

            return res.status(403).json({
                message: `You are blocked for another ${remainingMinutes} minutes and ${remainingSeconds} seconds`,
                success: false,
                code: 403
            });
        }

        // Generate OTP and send
        const otp = Math.floor(100000 + Math.random() * 900000);
        const existingOtp = await Otp.findOne({ email: emailId });

        if (existingOtp) {
            await Otp.deleteOne({ email: emailId });
        }

        const otpSchema = new Otp({
            email: emailId,
            otp: otp,
        });
        await otpSchema.save();

        // Send OTP email
        sendEmail(emailId, "Chagans Technologies Limited", "OTP for login", `Your OTP is ${otp} <br><br> This OTP is valid for only 5 minutes.`);

        res.status(200).json({ message: "OTP sent successfully", success: true, code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false, code: 500 });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { otp, email } = req.body;

        const adminData = await Admin.findOne({ email });
        if (!adminData) {
            return res.status(404).json({ message: "Invalid credentials", success: false, code: 404 });
        }
        const otpData = await Otp.findOne({ email });
        if (!otpData) {
            return res.status(404).json({ message: "OTP not found", success: false, code: 404 });
        }
        // Check if attempts exceeded
        if (otpData.totalAccess >= 3) {
            await Otp.deleteOne({ email });
            // Block user for 15 minutes
            adminData.blockedAt.push({
                date: new Date(),
                ip: req.ip,
                location: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
            });
            await adminData.save();

            return res.status(403).json({ message: "Maximum attempts reached, you are blocked for 15 minutes", success: false, code: 403 });
        }

        // Check if OTP is valid
        if (otpData.otp === otp) {
            await Otp.deleteOne({ email });

            // Log the login activity
            adminData.loginAt.push({
                date: new Date(),
                ip: req.ip,
                location: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
            });
            await adminData.save();

            res.status(200).json({ message: "OTP verified successfully", success: true, code: 200 });
        } else {
            await Otp.findOneAndUpdate({ email }, { $inc: { totalAccess: 1 } });
            const attemptLeft = 3 - otpData.totalAccess;
            res.status(400).json({
                message: "Invalid OTP",
                attemptLeft: attemptLeft > 0 ? attemptLeft : 0,
                success: false, code: 400
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message, success: false, code: 500 });
    }
};




module.exports = { login, register, verifyOtp }