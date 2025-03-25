const express = require("express");
const { getInstitutesByCommunity, getScholarships } = require("../controllers/scholarshipController");

const router = express.Router();

// Define route for fetching institutions by community with pagination
router.get("/", getScholarships);

module.exports = router;
