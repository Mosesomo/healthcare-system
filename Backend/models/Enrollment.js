// Enrollment model
const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  program: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Program',
    required: true
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Active', 'Completed', 'Suspended'],
    default: 'Active'
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

// Ensures a client can be enrolled only once in a specific program
enrollmentSchema.index({ client: 1, program: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);