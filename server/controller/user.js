const { sendEmail } = require("../mail");
const Otp = require("../model/otp");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required", success: false, code: 400 });
        }

        // Check if email already exists
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: "Email already registered", success: false, code: 400 });
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpSchema = new Otp({
            email,
            otp
        });
        await otpSchema.save();

        // Send OTP
        sendEmail(email, process.env.GMAIL_ID, "OTP Verification", `Your OTP is ${otp}, please do not share it with anyone. it will expire in 5 minutes.`);
        // Send OTP logic here
        res.status(200).json({ message: "OTP sent successfully", success: true, code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false, code: 500 });
    }
}

const verifyOtp = async (req, res) => {
    try {
        const { otp, email } = req.body;

        const otpData = await Otp.findOne({ email });
        if (!otpData) {
            return res.status(404).json({ message: "OTP not found", success: false, code: 404 });
        }
        // Check if OTP is valid
        if (otpData.otp === otp) {
            await Otp.deleteOne({ email });

            const user = new User({
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                name: req.body.name,
                address: req.body.address,
                companyDetials: req.body.companyDetials,
            })
            await user.save();
            res.status(200).json({ message: "OTP verified successfully", success: true, code: 200 });
        } else {
            res.status(400).json({ message: "Invalid OTP", success: false, code: 400 });
        }
    } catch (error) {
        res.status(500).json({ message: error.message, success: false, code: 500 });
    }
}

const kyc = async (req, res) => {
    try {
        const { AadharNo, panNo } = req.body;
        const adharImage = req.files.adharImage
        const panImage = req.files.panImage
        if (!AadharNo || !panNo) {
            return res.status(400).json({ message: "Aadhar and PAN number are required", success: false, code: 400 });
        }
        const email = req.email
        const user = await User.findOneAndUpdate({ email }, {
            kycDocument: {
                adharNo: AadharNo,
                panNo: panNo,
                adharImg: adharImage[0].filename,
                panImg: panImage[0].filename
            },
            kycStatus: "verifing"
        }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false, code: 404 });
        }
        res.status(200).json({ message: "KYC submitted successfully", success: true, code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false, code: 500 });
    }
}

const userProfileUpdate = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false, code: 404 });
        }
        user.userProfile = req.file.filename
        await user.save();

        res.status(200).json({ message: "Profile updated successfully", success: true, code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false, code: 500 });
    }
}

const login = async (req, res) => {
    try {
        const emailId = req.body.email;
        const userData = await User.findOne({ email: emailId });

        if (!userData) {
            return res.status(404).json({ message: "Invalid credentials", success: false, code: 404 });
        }

        // Check if admin is blocked
        const lastBlockedTime = userData.blockedAt.length > 0
            ? userData.blockedAt[userData.blockedAt.length - 1].date
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
        sendEmail(emailId, "Chagans Technologies Limited", "OTP for login", `Your OTP is ${otp}. <br><br> This OTP is valid for only 5 minutes.`);

        res.status(200).json({ message: "OTP sent successfully", success: true, code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false, code: 500 });
    }
};

const verifyLoginOtp = async (req, res) => {
    try {
        const { otp, email } = req.body;

        const adminData = await User.findOne({ email });
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
            adminData.logins.push({
                date: new Date(),
                ip: req.ip,
                location: { long: req.headers["longitude"], lat: req.headers["latitude"] },
            });
            await adminData.save();

            // generate token 
            const token = jwt.sign({
                _id: adminData._id, email: adminData.email, role: adminData.role,
                location: { long: req.headers["longitude"], lat: req.headers["latitude"] }
            }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

            // Send token to client
            res.status(200).json({
                message: "OTP verified successfully", token: token, success: true, code: 200,
                userData: {
                    _id: adminData._id,
                    name: adminData.name,
                    email: adminData.email,
                    role: adminData.role,
                    phoneNumber: adminData.phoneNumber,
                    companyDetails: adminData.companyDetials
                }
            });
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


const checkBalance = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.userEmail });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false, code: 404 });
        }
        res.status(200).json({ message: "Balance fetched successfully", success: true, code: 200, balance: user.accountDetails.balance });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false, code: 500 });
    }
}


const fetchProfilePic = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.userEmail });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false, code: 404 });
        }
        res.status(200).json({ message: "Profile picture fetched successfully", success: true, code: 200, profilePic: user.userProfile });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false, code: 500 });
    }
}

const uploadProfilePic = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.userEmail });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false, code: 404 });
        }
        user.userProfile = req.file.filename
        await user.save();

        res.status(200).json({ message: "Profile picture updated successfully", success: true, code: 200 });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false, code: 500 });
    }

}
module.exports = { sendOtp, verifyOtp, kyc, userProfileUpdate, login, verifyLoginOtp, checkBalance, fetchProfilePic, uploadProfilePic }