const logger = require("../utils/Logger.js");

module.exports = async (client) => {

  logger.heptagram(`Logged in as ${client.user.tag}. Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`);

  client.user.setStatus('online');
  client.user.setActivity(`${client.guilds.cache.size} servers!`, { type: "WATCHING" })

  logger.ready('Bot online and Ready!');

};
