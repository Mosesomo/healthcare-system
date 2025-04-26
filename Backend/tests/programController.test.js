const request = require('supertest');
const app = require('../server');
const Program = require('../models/Program');

describe('Program Controller', () => {
  let testProgram;

  beforeEach(async () => {
    testProgram = await Program.create({
      name: 'Yoga Class',
      description: 'Beginner yoga classes',
      category: 'Fitness',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      active: true
    });
  });


  describe('POST /api/programs', () => {
    it('should create a new program', async () => {
      const response = await request(app)
        .post('/api/programs')
        .send({
          name: 'Nutrition Workshop',
          description: 'Healthy eating habits',
          category: 'Education',
          startDate: '2023-02-01',
          endDate: '2023-02-28',
          active: true
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.name).toBe('Nutrition Workshop');
    });

    it('should return 400 for invalid program data', async () => {
      const response = await request(app)
        .post('/api/programs')
        .send({
          description: 'Missing name field',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/programs', () => {
    it('should get all programs', async () => {
      const response = await request(app).get('/api/programs');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBe(1);
    });
  });

  describe('GET /api/programs/:id', () => {
    it('should get a program by ID', async () => {
      const response = await request(app).get(`/api/programs/${testProgram._id}`);

      expect(response.status).toBe(200);
      expect(response.body._id).toBe(testProgram._id.toString());
    });

    it('should return 404 for non-existent program', async () => {
      const response = await request(app).get('/api/programs/507f1f77bcf86cd799439011');

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /api/programs/:id', () => {
    it('should update a program', async () => {
      const response = await request(app)
        .put(`/api/programs/${testProgram._id}`)
        .send({ name: 'Advanced Yoga' });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe('Advanced Yoga');
    });

    it('should return 404 for non-existent program', async () => {
      const response = await request(app)
        .put('/api/programs/507f1f77bcf86cd799439011')
        .send({ name: 'Advanced Yoga' });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/programs/:id', () => {
    it('should delete a program', async () => {
      const response = await request(app).delete(`/api/programs/${testProgram._id}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Program removed');

      const deletedProgram = await Program.findById(testProgram._id);
      expect(deletedProgram).toBeNull();
    });

    it('should return 404 for non-existent program', async () => {
      const response = await request(app).delete('/api/programs/507f1f77bcf86cd799439011');

      expect(response.status).toBe(404);
    });
  });
});