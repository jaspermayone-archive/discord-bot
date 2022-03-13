const { Discord, MessageEmbed } = require('discord.js');
const { colors } = require('../config/config.json');
const pjson = require('../../package.json');

exports.run = async (client, message, args, level) => {

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "announce",
  category: "Moderation",
  description: "Make an Announcemnet in your Server",
  usage: "announce <channel> <msg>"
};

