const { MessageEmbed, Options } = require('discord.js');
const { colors } = require('../config/config.json');
const pjson = require('../../package.json');

exports.run = async (client, message, args, level) => {
    
    const embed = new MessageEmbed()
    .setTitle('Heptagram API')
    .setColor(colors.heptagram)
    .setDescription(
      'The Heptagram bot relies on a first party api, developed to reduce external api reliances. Find more about it in the Heptagram server.',
    )
    .setTimestamp()
    .setFooter({
      text: `Message sent by Heptagram || ${pjson.version}`,
      iconURL: `${client.config.cdn.sqlogo}`,
    });
  message.reply({ embeds: [embed] });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['API'],
  permLevel: "User"
};

exports.help = {
  name: "api",
  category: "Info",
  description: "gives info about the Heptagram API",
  usage: "api"
};

