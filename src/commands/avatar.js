const { Discord, MessageEmbed } = require('discord.js');
const { colors } = require('../config/config.json');
const pjson = require('../../package.json');

exports.run = async (client, message, args, level) => {
  
    const member = message.mentions.users.first() || message.author;
    const membername = member.username;

    const avatarEmbed = new MessageEmbed()
    .setColor(client.config.colors.heptagram)
    .setTitle(`${membername}'s Avatar:`)
    .setImage(
        `${member.displayAvatarURL({ size: 4096, dynamic: true })}`,
      )
      .setTimestamp()
      .setFooter({
        text: `Message sent by Heptagram || ${pjson.version}`,
        iconURL: `${client.config.cdn.sqlogo}`,
      });

    message.reply({ embeds: [avatarEmbed] });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "avatar",
    category: "Utilities",
    description: "gets user's avatar",
    usage: "avatar <optionalUser>"
  };

