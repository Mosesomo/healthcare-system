const request = require('supertest');
const app = require('../server');
const Client = require('../models/Client');
const Program = require('../models/Program');
const Enrollment = require('../models/Enrollment');

describe('Enrollment Controller', () => {
  let testClient, testProgram, testEnrollment;

  beforeEach(async () => {
    testClient = await Client.create({
      firstName: 'Test',
      lastName: 'Client',
      gender: 'Male',
      dateOfBirth: '1990-01-01',
      phoneNumber: '1234567890',
      address: '123 Test St',
      medicalHistory: 'None'
    });

    testProgram = await Program.create({
      name: 'Test Program',
      description: 'Test Description',
      category: 'Test',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      active: true
    });

    testEnrollment = await Enrollment.create({
      client: testClient._id,
      program: testProgram._id,
      notes: 'Test notes'
    });
  });

  describe('POST /api/enrollments', () => {
    it('should create a new enrollment', async () => {
      const newClient = await Client.create({
        firstName: 'New',
        lastName: 'Client',
        gender: 'Female',
        dateOfBirth: '1995-01-01',
        phoneNumber: '9876543210',
        address: '456 New St',
        medicalHistory: 'None'
      });

      const response = await request(app)
        .post('/api/enrollments')
        .send({
          clientId: newClient._id,
          programId: testProgram._id,
          notes: 'New enrollment'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.client).toBe(newClient._id.toString());
    });

    it('should return 404 for non-existent client', async () => {
      const response = await request(app)
        .post('/api/enrollments')
        .send({
          clientId: '507f1f77bcf86cd799439011',
          programId: testProgram._id,
          notes: 'Test'
        });

      expect(response.status).toBe(404);
    });

    it('should return 400 for duplicate enrollment', async () => {
      const response = await request(app)
        .post('/api/enrollments')
        .send({
          clientId: testClient._id,
          programId: testProgram._id,
          notes: 'Duplicate'
        });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/enrollments', () => {
    it('should get all enrollments', async () => {
      const response = await request(app).get('/api/enrollments');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBe(1);
    });
  });

  describe('GET /api/enrollments/:id', () => {
    it('should get an enrollment by ID', async () => {
      const response = await request(app).get(`/api/enrollments/${testEnrollment._id}`);

      expect(response.status).toBe(200);
      expect(response.body._id).toBe(testEnrollment._id.toString());
    });

    it('should return 404 for non-existent enrollment', async () => {
      const response = await request(app).get('/api/enrollments/507f1f77bcf86cd799439011');

      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/enrollments/client/:clientId', () => {
    it('should get enrollments for a client', async () => {
      const response = await request(app).get(`/api/enrollments/client/${testClient._id}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBe(1);
    });

    it('should return empty array for client with no enrollments', async () => {
      const newClient = await Client.create({
        firstName: 'No',
        lastName: 'Enrollments',
        gender: 'Male',
        dateOfBirth: '1990-01-01',
        phoneNumber: '0000000000',
        address: 'No enrollments',
        medicalHistory: 'None'
      });

      const response = await request(app).get(`/api/enrollments/client/${newClient._id}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(0);
    });
  });

  describe('PUT /api/enrollments/:id', () => {
    it('should update an enrollment', async () => {
      const response = await request(app)
        .put(`/api/enrollments/${testEnrollment._id}`)
        .send({ notes: 'Updated notes', status: 'Completed' });

      expect(response.status).toBe(200);
      expect(response.body.notes).toBe('Updated notes');
      expect(response.body.status).toBe('Completed');
    });

    it('should return 404 for non-existent enrollment', async () => {
      const response = await request(app)
        .put('/api/enrollments/507f1f77bcf86cd799439011')
        .send({ notes: 'Updated' });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/enrollments/:id', () => {
    it('should delete an enrollment', async () => {
      const response = await request(app).delete(`/api/enrollments/${testEnrollment._id}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Enrollment removed');

      const deletedEnrollment = await Enrollment.findById(testEnrollment._id);
      expect(deletedEnrollment).toBeNull();
    });

    it('should return 404 for non-existent enrollment', async () => {
      const response = await request(app).delete('/api/enrollments/507f1f77bcf86cd799439011');

      expect(response.status).toBe(404);
    });
  });
});