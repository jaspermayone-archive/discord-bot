const logger = require("../utils/Logger.js");
const { MessageEmbed } = require('discord.js');

module.exports = async (client) => {

  if (process.env.NODE_ENV === "production") {
logger.info(`Heptagram Started in PRODUCTION Mode`);
  }
  if (process.env.NODE_ENV === "development") {
    logger.info(`Heptagram Started in DEVELOPMENT Mode`);
  }

  logger.heptagram(`Logged in as ${client.user.tag}. Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`);

  client.user.setStatus('online');
  client.user.setActivity(`${client.guilds.cache.size} servers!`, { type: "WATCHING" })

  logger.ready('Bot online and Ready!');

};
