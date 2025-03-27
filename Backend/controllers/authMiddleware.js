const jwt = require("jsonwebtoken");
const User = require("../schema/userSchema"); // Import User model
const JWT_SECRET = process.env.JWT_SECRET;
// console.log("JWT_SECRET:", JWT_SECRET); //Debugging: Check if secret is loaded

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from cookies or Authorization header
    const token = req.cookies?.token || req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    // Get token from cookies or Authorization header
    // console.log("Cookies:", req.cookies);
    // console.log("Authorization Header:", req.header("Authorization"));

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log(decoded)
    req.user = decoded; // Attach user ID to request

    // Fetch user details from DB
    const user = await User.findById(decoded.id).select("name email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach full user object to request
    req.user.name = user.name;
    req.user.email = user.email;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Session expired. Please log in again." });
    }
    console.log(error)
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
