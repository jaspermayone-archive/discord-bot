/* eslint-disable no-unused-vars */
const Discord = require('discord.js');
const { config, colors } = require('../config/config.json');
const pjson = require('../../package.json');

/*
module.exports = {
  name: 'announce',
  description: 'Make an Announcemnet in your Server',
  category: 'Resources',
  minArgs: 2,
  expectedArgs: '<channel> <msg>',
  permissions: ['MANAGE_MESSAGES'],
  cooldown: '1m',
*/

exports.run = async (client, message, args, level) => {
    const anchannel = message.mentions.channels.first();

    const announcementMessage = args.slice(1).join(' ');
    if (!announcementMessage) {
      return message.reply('You must provide a message to announce!');
    }

    const embed = new Discord.MessageEmbed()
      .setTitle('📣 **Announcement!** 📣')
      .setColor(colors.heptagram)
      .setDescription(announcementMessage)
      .setTimestamp();

    anchannel.send({ embeds: [embed] });

    const anembed = new Discord.MessageEmbed()
      .setTitle('<a:verifyblue:951863100292857859> Done! <a:verifyblue:951863100292857859>')
      .setDescription(`Announcement has been sent to ${anchannel}`)
      .setColor(colors.heptagram)
      .setTimestamp();

    message.reply({ embeds: [anembed] });
  };

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: "announce",
  category: "Moderation",
  description: "Make an Announcemnet in your Server",
  usage: "announce <channel> <msg>"
};

