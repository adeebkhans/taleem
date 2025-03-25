const express = require("express");
const cors = require("cors");
const instituteRoutes = require("./routes/instituteRoutes");
const scholarshipRoutes = require("./routes/scholarshipRoutes");

const app = express();
const PORT = 3000;

// Enable CORS for all origins
app.use(cors());

// Middleware for parsing JSON
app.use(express.json());

// Use the routes
app.use("/api/institutes", instituteRoutes);
app.use("/api/scholarships", scholarshipRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
