const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser"); 
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables
const mongoose = require("mongoose");

const instituteRoutes = require("./routes/instituteRoutes");
const scholarshipRoutes = require("./routes/scholarshipRoutes");
const opportunityRoutes = require("./routes/opportunityRoutes");
const AuthRoutes = require("./routes/AuthRoutes");
const eventRoutes = require("./routes/eventRoutes");
const postRoutes = require("./routes/postRoutes");
const chatRoutes = require("./routes/chatRoutes");


const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
async function mongodb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
}
mongodb();

// Enable CORS and allow cookies
app.use(
  cors({
    origin: ["http://localhost:5173", "https://taleemfrontend.vercel.app"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


// Middleware
app.use(cookieParser()); 
app.use(express.json());
app.set('trust proxy', 1);

// Routes
app.use("/api/institutes", instituteRoutes);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/opportunity", opportunityRoutes);
app.use("/api/community/posts", postRoutes);
app.use("/api/community/events", eventRoutes);
app.use("/api/chat/", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
