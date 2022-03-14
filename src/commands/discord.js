const { MessageEmbed } = require('discord.js');
const { colors, invites } = require('../config/config.json');
const pjson = require('../../package.json');

exports.run = async (client, message, args, level) => {
    const embed = new MessageEmbed()
    .setTitle('Come join the Heptagram bot discord server!')
    .setColor(colors.heptagram)
    .setDescription(
      `Join the Heptagram bot discord server at ${invites.server}`,
    )
    .setTimestamp();
  message.reply({ embeds: [embed] });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "discord",
  category: "Info",
  description: "sends a link for the bot support server",
  usage: "discord"
};

