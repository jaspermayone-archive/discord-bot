const { MessageEmbed, Options } = require('discord.js');
const math = require('mathjs');
const { colors } = require('../config/config.json');
const pjson = require('../../package.json');

exports.run = async (client, message, args, level) => {

    const embed = new MessageEmbed()
    .setTitle('Heptagram API')
    .setColor(client.config.colors.heptagram)
    .setDescription(
      'The Heptagram bot relies on a first party api, developed to reduce external api reliances. Find more about it in the Heptagram server.',
    )
    .addField('Are you a bot developer or coder? Do you have knowledge about API creation and development? If so, please join the discord server and ask for J-dogcoder', `${client.config.invites.server}`)
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

