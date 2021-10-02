const { colors, cdn } = require('../../config.json');
const Discord = require('discord.js');
const pjson = require('../../package.json');

module.exports = {
  name: 'support',
  description: 'sends a link for the bot support server',
  category: 'Info',
  minArgs: 0,
  maxArgs: 0,
  expectedArgs: '',
  cooldown: '1m',

  callback: ({ message }) => {
    const inviteEmbed = new Discord.MessageEmbed()
      .setColor(colors.heptagram)
      .setTitle('Need some help with the Heptagram Bot?')
      .addFields({
        name: 'Need some help?',
        value: 'Join our discord server at https://discord.gg/HSupF99kpq',
        inline: false,
      })
      .addFields({
        name: 'Please Note:',
        value:
          'this is for Heptagram Bot help only. For server specific help, contact a Modarator or Admin.',
        inline: false,
      })
      .setTimestamp()
      .setFooter(
        `Message sent by the Heptagram Bot || ${pjson.version}`,
        `${cdn.sqlogo}`,
      );

    message.reply({ embeds: [inviteEmbed] });
  },
};
