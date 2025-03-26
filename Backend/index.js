const express = require("express");
const cors = require("cors");
const instituteRoutes = require("./routes/instituteRoutes");
const scholarshipRoutes = require("./routes/scholarshipRoutes");
const opportunityRoutes = require("./routes/opportunityRoutes");
const AuthRoutes = require("./routes/AuthRoutes");
const dotenv = require("dotenv");
const mongoose = require("mongoose"); // Import mongoose

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable for port or default to 3000

async function mongodb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("mongodb connected");
  } catch (error) {
    console.error("mongodb connection failed:", error); 
  }
}

mongodb();

app.use(
    cors({
      origin: "http://localhost:5173", // Allow frontend domain explicitly
      credentials: true, // Allow cookies and authorization headers
    })
  );
  

// Middleware for parsing JSON
app.use(express.json());

// Use the routes
app.use("/api/institutes", instituteRoutes);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/opportunity", opportunityRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});