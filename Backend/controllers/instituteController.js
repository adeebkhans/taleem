const fs = require("fs"); 
const path = require("path");

// Load categorized institutions from JSON
const dataPath = path.join(__dirname, "../data/categorized_institutions.json");
const institutionsData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

// Utility function for partial string matching
const isPartialMatch = (str, keyword) => str.toLowerCase().includes(keyword.toLowerCase());

// Define course keywords mapping
const courseKeywords = {
    "School": ["school", "primary", "high school", "secondary"],
    "Engineering & Technology": ["engineering", "technology", "tech", "engineer"],
    "Medicine": ["medical", "pharmacy", "clinic", "hospital"],
    "Management": ["management", "business", "mba"],
    "Science": ["science", "research", "lab"],
};

const getInstitutesByCommunity = (req, res) => {
    const { community } = req.params;
    const { page = 1, limit = 50, state, course } = req.query;

    const communityKey = `${community}-Institutes`;
    let communityInstitutes = institutionsData[communityKey] || [];

    // Filter by state with partial matching
    if (state) {
        communityInstitutes = communityInstitutes.filter(institute =>
            isPartialMatch(institute.state || '', state)
        );
    }

    // Filter by course title keywords
    if (course && courseKeywords[course]) {
        communityInstitutes = communityInstitutes.filter(institute =>
            courseKeywords[course].some(keyword => isPartialMatch(institute.name || '', keyword))
        );
    }

    // Pagination logic
    const startIndex = (page - 1) * limit;
    const paginatedInstitutes = communityInstitutes.slice(startIndex, startIndex + parseInt(limit));

    res.json({
        total: communityInstitutes.length,
        page: parseInt(page),
        limit: parseInt(limit),
        data: paginatedInstitutes,
    });
};

module.exports = {
    getInstitutesByCommunity,
};
