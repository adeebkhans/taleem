const fs = require("fs");
const path = require("path");

// Load scholarship data from JSON
const dataPath = path.join(__dirname, "../data/scholarshipData.json"); // source - https://muslimmirror.com/scholarship/
const scholarshipsData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

// Utility function for boolean conversion
const convertToBoolean = (value) => {
    if (typeof value === 'string') {
        return value.toLowerCase() === 'true';
    }
    return !!value;
};

// Utility function for partial string matching
const isPartialMatch = (str, keyword) => str.toLowerCase().includes(keyword.toLowerCase());

const getScholarships = (req, res) => {
    const { page = 1, limit = 50, government, muslimSpecific, state } = req.query;

    let filteredScholarships = [...scholarshipsData]; // Create a copy to avoid modifying the original data

    // Filter by government
    if (government !== undefined) {
        const isGovernment = convertToBoolean(government);
        filteredScholarships = filteredScholarships.filter(scholarship => {
            const orgTypeLower = (scholarship.OrganizationType || '').toLowerCase();
            return isGovernment ? orgTypeLower === 'government' : orgTypeLower !== 'government';
        });
    }

    // Filter by MuslimSpecific
    if (muslimSpecific !== undefined) {
        const isMuslimSpecific = convertToBoolean(muslimSpecific);
        filteredScholarships = filteredScholarships.filter(scholarship => {
            const muslimSpecificLower = (scholarship.MuslimSpecific || '').toLowerCase();
            return isMuslimSpecific ? muslimSpecificLower === 'yes' : muslimSpecificLower === 'no';
        });
    }

    // Filter by state
    if (state) {
        filteredScholarships = filteredScholarships.filter(scholarship =>
            isPartialMatch(scholarship.State || '', state)
        );
    }

    // Pagination logic
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedScholarships = filteredScholarships.slice(startIndex, endIndex);

    res.json({
        total: filteredScholarships.length,
        page: parseInt(page),
        limit: parseInt(limit),
        data: paginatedScholarships,
    });
};

module.exports = {
    getScholarships,
};