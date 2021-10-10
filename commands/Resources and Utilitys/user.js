const moment = require('moment');
const Discord = require('discord.js');
const { colors, cdn } = require('../../config.json');
const pjson = require('../../package.json');

module.exports = {
  name: 'user',
  description: 'gives info about user.',
  category: 'Resources',
  minArgs: 0,
  maxArgs: 1,
  expectedArgs: '<user you want info about (optional)>',
  cooldown: '30s',

  callback: ({ message }) => {
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
      .setFooter(
        `Message sent by the Heptagram Bot || ${pjson.version}`,
        `${cdn.sqlogo}`,
      );

    message.reply({ embeds: [embed] });
  },
};
