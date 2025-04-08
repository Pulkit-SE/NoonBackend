require("dotenv").config();

const jwt = require("jsonwebtoken");

const validateToken = (token) => {
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // Return the decoded payload (e.g., { userId: "123" })
  } catch (error) {
    console.error("Token validation failed:", error.message);
    return null; // Return null if the token is invalid
  }
};

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"
  if (!token) {
    return res
      .status(401)
      .json({ status: "error", message: "No token provided" });
  }
  const decoded = validateToken(token); // Validate the token
  console.log('reached here',decoded)
  if (!decoded.email) {
    return res.status(401).json({ status: "error", message: "Invalid token" });
  }

  req.user = decoded._id; // Attach the decoded payload (e.g., { userId: "123" }) to the request object
  next(); // Proceed to the next middleware or route handler
};

module.exports = authenticateUser;

