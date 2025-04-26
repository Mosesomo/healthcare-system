const app = require('../server');
const mongoose = require('mongoose');
const { createServer } = require('http');

let server;

beforeAll(async () => {
  // Prevent Express from trying to start in tests
  jest.mock('../server', () => {
    const express = require('express');
    const app = express();
    app.use(express.json());
    return app;
  });
  
  // Start test server on random port
  server = createServer(app);
  await new Promise(resolve => server.listen(0, resolve));
});

afterAll(async () => {
  await global.__MONGOOSE__.close();
  await new Promise(resolve => server.close(resolve));
});

afterEach(async () => {
  await global.__MONGOOSE__.clear();
});

module.exports = {
  getApp: () => app,
  getServer: () => server,
};