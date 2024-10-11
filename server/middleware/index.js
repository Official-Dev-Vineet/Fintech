const jwt = require("jsonwebtoken");

function locationMiddleware(req, res, next) {
    // Check for longitude and latitude in the request body or query parameters
    const { longitude, latitude } = req.headers;

    // If either longitude or latitude is missing, send a 400 Bad Request response
    if (!longitude || !latitude) {
        return res.status(400).json({
            success: false,
            message: "Location details are required. Please provide both longitude and latitude."
        });
    }

    // If both are present, proceed to the next middleware or controller
    next();
};


const verifyToken = (req, res, next) => {
    // Get token from Authorization header
    const token = req.headers["authorization"];

    // Check if token is provided
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        // Remove 'Bearer ' if it exists
        const bearerToken = token.startsWith("Bearer ") ? token.slice(7, token.length) : token;

        // Verify the token using the JWT secret key
        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET_KEY);

        // Attach decoded token data (user info) to the request object
        req.user = decoded;
        
        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        // If the token is invalid or expired, return an unauthorized response
        return res.status(401).json({ message: "Invalid token." });
    }
};


module.exports = { locationMiddleware,verifyToken }