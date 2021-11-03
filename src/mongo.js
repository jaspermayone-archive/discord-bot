const mongoose = require('mongoose');
const { MongoDB } = require('./config.json');

module.exports = async () => {
  await mongoose.connect(MongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return mongoose;
};
