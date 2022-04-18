const mongoose = require("mongoose");
require("dotenv").config();
const logger = require("./utils/Logger.js");

module.exports = async () => {
 // logger.mongo("Connecting to MongoDB...");
  mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
     // logger.mongo("MongoDB Connected!");
      return mongoose;
    })
    .catch((err) => {
      logger.error(err);
    });
};
