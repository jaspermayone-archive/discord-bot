const Discord = require('discord.js');
const moment = require('moment');
const { colors } = require('../config/config.json');
const pjson = require('../../package.json');

exports.run = async (client, message, args, level) => {
    let user;

    if (message.mentions.users.first()) {
      user = message.mentions.members.first();
    } else {
      user = message.member;
    }

    const embed = new Discord.MessageEmbed()
      .setColor(colors.heptagram)
      .setThumbnail(message.author.avatarURL)
      .addField(`Username:`, `${user}`, true)
      .addField('ID:', `${user.id}`, true)
      .addField(
        'Nickname:',
        `${user.nickname !== null ? `${user.nickname}` : 'None'}`,
        true,
      )
      .addField('Colour', user.displayHexColor, true)
      .addField('In Server', message.guild.name, true)
      .addField(
        'Joined The Server On:',
        `${moment.utc(user.joinedAt).format('dddd, MMMM Do YYYY')}`,
        true,
      )
      .addField(
        'Account Created On:',
        `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY')}`,
        true,
      )
      .addField(
        'Nitro',
        user.premiumSinceTimestamp
          ? `Since ${new Date(user.premiumSinceTimestamp).toLocaleDateString()}`
          : 'No.',
        true,
      )
      .addField(
        'Roles:',
        user.roles.cache.map((role) => `<@&${role.id}>`).join(' '),
        false,
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
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "user",
  category: "Utilities",
  description: "gives info about user",
  usage: "user <user you want info about (optional)>"
};

