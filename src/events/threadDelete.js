const logger = require("../util/logger.js");
module.exports = async (client, thread) => {
    thread.leave();
  };