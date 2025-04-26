// Programm Controller
const Program = require('../models/Program');


const createProgram = async (req, res) => {
  try {
    const { name, description, category, startDate, endDate, active } = req.body;

    const program = await Program.create({
      name,
      description,
      category,
      startDate,
      endDate,
      active
    });

    if (program) {
      res.status(201).json(program);
    } else {
      res.status(400);
      throw new Error('Invalid program data');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find({});
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    
    if (program) {
      res.json(program);
    } else {
      res.status(404);
      throw new Error('Program not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


const updateProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    
    if (program) {
      program.name = req.body.name || program.name;
      program.description = req.body.description || program.description;
      program.category = req.body.category || program.category;
      program.startDate = req.body.startDate || program.startDate;
      program.endDate = req.body.endDate || program.endDate;
      program.active = req.body.active !== undefined ? req.body.active : program.active;

      const updatedProgram = await program.save();
      res.json(updatedProgram);
    } else {
      res.status(404);
      throw new Error('Program not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findById(req.params.id);
    
    if (program) {
      await program.deleteOne();
      res.json({ message: 'Program removed' });
    } else {
      res.status(404);
      throw new Error('Program not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createProgram,
  getPrograms,
  getProgramById,
  updateProgram,
  deleteProgram
};