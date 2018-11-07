const mongoose = require('mongoose');

const { MONGO_ID, MONGO_PASSWORD, NODE_ENV } = process.env;
//const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/admin`;
const MONGO_URL = `mongodb://127.0.0.1:27017`;


module.exports = () => {
  const connect = () => {
    if (NODE_ENV !== 'production') {
      mongoose.set('debug', true);
    }
    mongoose.connect(MONGO_URL, {
      dbName: 'nodeplace',
    }, (error) => {
      if (error) {
        console.log('MongoDB connection error', error);
      } else {
        console.log('MongoDB connection success');
      }
    });
  };
  connect();

  mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error', error);
  });
  mongoose.connection.on('disconnected', () => {
    console.error('MongoDB disconnected. Trying to connect again.');
    connect();
  });

  require('./favorite');
  require('./history');
};