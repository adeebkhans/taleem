const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../schema/userSchema");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
};

// **User Signup**
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    const token = generateToken(newUser);

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      domain: ".vercel.app", // Ensures cookie works across subdomains
      path: "/",          // Makes the cookie available to all routes
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// **User Login**
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (!user.password) return res.status(400).json({ message: "Use Google login" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// **Google Login**
exports.googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, picture, sub: googleId } = ticket.getPayload();
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ name, email, googleId, profilePicture: picture });
      await user.save();
    }

    const token = generateToken(user);

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Google authentication failed", error });
  }
};

exports.logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    expires: new Date(0), // Expire the cookie immediately
  });

  res.status(200).json({ message: "Logged out successfully" });
};

