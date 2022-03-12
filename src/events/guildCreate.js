const logger = require("../utils/Logger.js");
const { MessageEmbed } = require('discord.js');

module.exports = (client, guild) => {
  logger.log(`[GUILD JOIN] ${guild.id} added the bot. Owner: ${guild.ownerId}`);
};
