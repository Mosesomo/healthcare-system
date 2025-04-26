const request = require('supertest');
const app = require('../server');
const Client = require('../models/Client');

describe('Client Controller', () => {
  let testClient;

  beforeEach(async () => {
    testClient = await Client.create({
      firstName: 'John',
      lastName: 'Doe',
      gender: 'Male',
      dateOfBirth: '1990-01-01',
      phoneNumber: '1234567890',
      address: '123 Main St',
      medicalHistory: 'None'
    });
  });

  describe('POST /api/clients', () => {
    it('should create a new client', async () => {
      const response = await request(app)
        .post('/api/clients')
        .send({
          firstName: 'Jane',
          lastName: 'Smith',
          gender: 'Female',
          dateOfBirth: '1985-05-15',
          phoneNumber: '9876543210',
          address: '456 Oak Ave',
          medicalHistory: 'Allergies'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.firstName).toBe('Jane');
    });

    it('should return 400 for invalid client data', async () => {
      const response = await request(app)
        .post('/api/clients')
        .send({
          lastName: 'Smith',
          // Missing required firstName
        });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/clients', () => {
    it('should get all clients', async () => {
      const response = await request(app).get('/api/clients');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBe(1);
    });
  });

  describe('GET /api/clients/:id', () => {
    it('should get a client by ID', async () => {
      const response = await request(app).get(`/api/clients/${testClient._id}`);

      expect(response.status).toBe(200);
      expect(response.body._id).toBe(testClient._id.toString());
    });

    it('should return 404 for non-existent client', async () => {
      const response = await request(app).get('/api/clients/507f1f77bcf86cd799439011');

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/clients/:id', () => {
    it('should update a client', async () => {
      const response = await request(app)
        .put(`/api/clients/${testClient._id}`)
        .send({ firstName: 'Jonathan' });

      expect(response.status).toBe(200);
      expect(response.body.firstName).toBe('Jonathan');
    });

    it('should return 404 for non-existent client', async () => {
      const response = await request(app)
        .put('/api/clients/507f1f77bcf86cd799439011')
        .send({ firstName: 'Jonathan' });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/clients/:id', () => {
    it('should delete a client', async () => {
      const response = await request(app).delete(`/api/clients/${testClient._id}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Client removed');

      const deletedClient = await Client.findById(testClient._id);
      expect(deletedClient).toBeNull();
    });

    it('should return 404 for non-existent client', async () => {
      const response = await request(app).delete('/api/clients/507f1f77bcf86cd799439011');

      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/clients/search', () => {
    it('should search clients by query', async () => {
      await Client.create({
        firstName: 'Alice',
        lastName: 'Johnson',
        gender: 'Female',
        dateOfBirth: '1995-03-20',
        phoneNumber: '5551234567',
        address: '789 Pine Rd',
        medicalHistory: 'Asthma'
      });

      const response = await request(app).get('/api/clients/search?query=john');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2); // John Doe and Alice Johnson
    });

    it('should return all clients when no query provided', async () => {
      const response = await request(app).get('/api/clients/search');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
    });
  });
});