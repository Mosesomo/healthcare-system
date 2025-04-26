const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Increase timeout for slow CI environments
jest.setTimeout(30000); // 30 seconds

let mongoServer;

module.exports = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  return {
    mongoServer,
    mongooseConnection: mongoose.connection,
  };
};

global.__MONGOOSE__ = {
  close: async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  },
  clear: async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  }
};