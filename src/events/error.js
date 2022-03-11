const logger = require("../utils/Logger.js");
const { MessageEmbed } = require('discord.js');

module.exports = async (client, error, interaction) => {
logger.error(`An error event was sent by Discord.js. \nError from command ${interaction.data.name} : \n${JSON.stringify(error.message)}`);
  logger.error(`${error.stack}\n`)
};
