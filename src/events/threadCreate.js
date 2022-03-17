const logger = require("../utils/Logger.js");
const { MessageEmbed } = require('discord.js');

module.exports = async (client, error, interaction, thread) => {
    thread.join();
};
