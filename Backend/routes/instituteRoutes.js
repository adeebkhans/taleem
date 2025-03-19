const express = require("express");
const { getInstitutesByCommunity } = require("../controllers/instituteController");

const router = express.Router();

// Define route for fetching institutions by community with pagination
router.get("/:community", getInstitutesByCommunity);

module.exports = router;
