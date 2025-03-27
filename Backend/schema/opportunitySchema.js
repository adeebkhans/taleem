const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  organization: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['internship', 'job', 'research', 'volunteer'],
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  hasReferral: {
    type: Boolean,
    default: false,
  },
  referralEmail: {
    type: String,
    trim: true,
    validate: {
      validator: function (email) {
        return !this.hasReferral || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: 'Invalid email format for referral.',
    },
  },
  referralFormLink: {
    type: String,
    trim: true,
  },
  link: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the User model
    required: true,
  },
});

module.exports = mongoose.model('Opportunity', opportunitySchema);
