const { MessageEmbed } = require('discord.js');
const { colors, invites } = require('../config/config.json');
const pjson = require('../../package.json');

exports.run = async (client, message, args, level) => {
    const inviteEmbed = new MessageEmbed()
    .setColor(client.config.colors.heptagram)
    .setTitle('Need some help with the Heptagram Bot?')
    .addFields({
      name: 'Need some help?',
      value: `Join our discord server at ${invites.server}`,
      inline: false,
    })
    .addFields({
      name: 'Please Note:',
      value:
        'this is for Heptagram Bot help only. For server specific help, contact a Modarator or Admin.',
      inline: false,
    })
    .setTimestamp()
.setFooter({
      text: `Message sent by Heptagram || ${pjson.version}`,
      iconURL: `${client.config.cdn.sqlogo}`,
    });

  message.reply({ embeds: [inviteEmbed] });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "support",
  category: "Info",
  description: "sends a link for the bot support server",
  usage: "support"
};

