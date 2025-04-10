const Opportunity = require('../schema/opportunitySchema');
const User = require('../schema/userSchema'); // Import User model

// Get all opportunities and populate the postedBy field with the user's name
const getOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find()
      .populate('postedBy', 'name') // Populate only the name field
      .sort({ postedAt: -1 });

    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Add a new opportunity
const addOpportunity = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const newOpportunity = new Opportunity({
      ...req.body,
      postedBy: req.user.id, // Assign the user ID from the token
    });

    await newOpportunity.save();
    res.status(201).json(newOpportunity);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error });
  }
};

// Delete an opportunity (only the creator can delete)
const deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    // Ensure only the user who created the opportunity can delete it
    if (opportunity.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this opportunity' });
    }

    await opportunity.deleteOne();
    res.json({ message: 'Opportunity deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  getOpportunities,
  addOpportunity,
  deleteOpportunity,
};
