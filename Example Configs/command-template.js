const { MessageEmbed } = require("discord.js");
const pjson = require("../../package.json");
const { settings } = require("../utils/settings.js");

exports.run = async (client, message, args, level) => {
  const prefix = settings.get(message.guild.id).prefix;


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
};

exports.help = {
  name: "announce",
  category: "Fun",
  description: "Make an Announcemnet in your Server",
  usage: "announce <channel> <msg>",
};
