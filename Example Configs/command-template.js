const { MessageEmbed } = require('discord.js');
const pjson = require('../../package.json');
const { settings } = require("../utils/settings.js");

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

