const jwt = require("jsonwebtoken");
const User = require("../schema/userSchema"); // Import User model
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access Denied: No Token Provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Contains user ID

    // Fetch user details from DB and add to req.user
    const user = await User.findById(decoded.id).select('name');
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user.name = user.name; // Add name to req.user
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
