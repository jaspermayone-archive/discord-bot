const logger = require("../utils/Logger.js");
const { settings } = require("../utils/settings.js");
const { MessageEmbed } = require('discord.js');

module.exports = (client, guild) => {
  if (!guild.available) return; 
  
  logger.log(`[GUILD LEAVE] ${guild.id} removed the bot.`);

};