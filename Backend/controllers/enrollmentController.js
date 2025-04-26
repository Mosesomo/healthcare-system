const Enrollment = require('../models/Enrollment');
const Client = require('../models/Client');
const Program = require('../models/Program');


const enrollClient = async (req, res) => {
  try {
    const { clientId, programId, notes } = req.body;

    // Check if client exists
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Check if program exists
    const program = await Program.findById(programId);
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    // Check if client is already enrolled in this program
    const existingEnrollment = await Enrollment.findOne({
      client: clientId,
      program: programId
    });

    if (existingEnrollment) {
      return res.status(400).json({ message: 'Client is already enrolled in this program' });
    }

    const enrollment = await Enrollment.create({
      client: clientId,
      program: programId,
      notes
    });

    if (enrollment) {
      res.status(201).json(enrollment);
    } else {
      res.status(400);
      throw new Error('Invalid enrollment data');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({})
      .populate('client', 'firstName lastName')
      .populate('program', 'name');
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate('client', 'firstName lastName')
      .populate('program', 'name');
    
    if (enrollment) {
      res.json(enrollment);
    } else {
      res.status(404);
      throw new Error('Enrollment not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


const getClientEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ client: req.params.clientId })
      .populate('program', 'name description category');
    
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    
    if (enrollment) {
      enrollment.status = req.body.status || enrollment.status;
      enrollment.notes = req.body.notes || enrollment.notes;

      const updatedEnrollment = await enrollment.save();
      res.json(updatedEnrollment);
    } else {
      res.status(404);
      throw new Error('Enrollment not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);
    
    if (enrollment) {
      await enrollment.deleteOne();
      res.json({ message: 'Enrollment removed' });
    } else {
      res.status(404);
      throw new Error('Enrollment not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  enrollClient,
  getEnrollments,
  getEnrollmentById,
  getClientEnrollments,
  updateEnrollment,
  deleteEnrollment
};