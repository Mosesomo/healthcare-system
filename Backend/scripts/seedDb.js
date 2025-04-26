const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Client = require('../models/Client');
const Program = require('../models/Program');
const Enrollment = require('../models/Enrollment');

// Load environment variables
dotenv.config();

// Connect to the database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Sample data for clients
const clientData = [
  {
    firstName: 'John',
    lastName: 'Doe',
    gender: 'Male',
    dateOfBirth: new Date('1985-05-15'),
    phoneNumber: '555-123-4567',
    address: {
      street: '123 Main St',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62704'
    },
    medicalHistory: 'No significant medical history'
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    gender: 'Female',
    dateOfBirth: new Date('1990-02-20'),
    phoneNumber: '555-987-6543',
    address: {
      street: '456 Oak Ave',
      city: 'Springfield',
      state: 'IL',
      zipCode: '62701'
    },
    medicalHistory: 'Asthma'
  },
  {
    firstName: 'Robert',
    lastName: 'Johnson',
    gender: 'Male',
    dateOfBirth: new Date('1975-11-08'),
    phoneNumber: '555-456-7890',
    address: {
      street: '789 Pine Blvd',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601'
    },
    medicalHistory: 'Hypertension, Type 2 Diabetes'
  }
];

// Sample data for programs
const programData = [
  {
    name: 'Wellness Workshop',
    description: 'A 6-week program focusing on overall wellness and healthy habits',
    category: 'Wellness',
    startDate: new Date('2025-05-01'),
    endDate: new Date('2025-06-12'),
    active: true
  },
  {
    name: 'Physical Therapy Program',
    description: 'Rehabilitation program for individuals recovering from physical injuries',
    category: 'Rehabilitation',
    startDate: new Date('2025-05-15'),
    endDate: new Date('2025-08-15'),
    active: true
  },
  {
    name: 'Nutrition Counseling',
    description: 'One-on-one nutrition counseling sessions with certified nutritionists',
    category: 'Nutrition',
    startDate: new Date('2025-04-01'),
    endDate: new Date('2025-12-31'),
    active: true
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    // Connect to the database
    const conn = await connectDB();
    
    // Clear existing data
    await Client.deleteMany({});
    await Program.deleteMany({});
    await Enrollment.deleteMany({});
    
    console.log('Data cleared from database');
    
    // Insert clients
    const createdClients = await Client.insertMany(clientData);
    console.log(`${createdClients.length} clients inserted`);
    
    // Insert programs
    const createdPrograms = await Program.insertMany(programData);
    console.log(`${createdPrograms.length} programs inserted`);
    
    
    const enrollmentData = [
      {
        client: createdClients[0]._id,
        program: createdPrograms[0]._id,
        enrollmentDate: new Date(),
        status: 'Active',
        notes: 'Client is highly motivated'
      },
      {
        client: createdClients[1]._id,
        program: createdPrograms[1]._id,
        enrollmentDate: new Date(),
        status: 'Active',
        notes: 'Client requires follow-up assessment'
      },
      {
        client: createdClients[2]._id, 
        program: createdPrograms[2]._id,
        enrollmentDate: new Date(),
        status: 'Active',
        notes: 'Dietary restrictions noted'
      }
    ];
    
    const createdEnrollments = await Enrollment.insertMany(enrollmentData);
    console.log(`${createdEnrollments.length} enrollments inserted`);
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

// Running the seed function
seedDatabase();