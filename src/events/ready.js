const logger = require("../util/logger.js");
module.exports = async client => {
    client.user.setStatus('online');
    client.user.setActivity(`${client.guilds.cache.size} servers!`, {
      type: 'WATCHING',
    });
    logger.heptagram(`Logged in as ${client.user.tag}. Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`);
    logger.ready('Bot online and Ready!');
  };