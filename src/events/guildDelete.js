const logger = require("../modules/Logger.js");
const { settings } = require("../modules/settings.js");

module.exports = (client, guild) => {
  if (!guild.available) return; 
  
  logger.log(`[GUILD LEAVE] ${guild.id} removed the bot.`);

};