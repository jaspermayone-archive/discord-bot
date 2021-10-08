/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const { colors, cdn } = require('../../config.json');
const pjson = require('../../package.json');

module.exports = {
  name: 'announce',
  description: 'Make an Announcemnet in your Server',
  category: 'Resources',
  minArgs: 2,
  expectedArgs: '<channel> <msg>',
  permissions: ['MANAGE_MESSAGES'],
  cooldown: '1m',

  callback: ({ message, args, client }) => {
    const anchannel = message.mentions.channels.first();

    const announcementMessage = args.slice(1).join(' ');
    if (!announcementMessage) {
      return message.reply('');
    }

    const embed = new Discord.MessageEmbed()
      .setTitle('**Announcement!**')
      .setColor(colors.heptagram)
      .setDescription(announcementMessage)
      .setTimestamp()
      .setFooter('Message sent by the Heptagram Bot', `${cdn.sqlogo}`);

    anchannel.send({ embeds: [embed] });

    const anembed = new Discord.MessageEmbed()
      .setTitle('Done!')
      .setDescription(`Announcement has been sent to ${anchannel}`)
      .setColor(colors.heptagram)
      .setTimestamp()
      .setFooter(
        `Message sent by the Heptagram Bot || ${pjson.version}`,
        `${cdn.sqlogo}`,
      );

    message.reply({ embeds: [anembed] });
  },
};
