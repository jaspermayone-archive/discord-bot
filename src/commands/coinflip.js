const { MessageEmbed } = require("discord.js");
const pjson = require("../../package.json");
const { settings } = require("../utils/settings.js");

exports.run = async (client, message, args, level) => {
  const prefix = settings.get(message.guild.id).prefix;

  const embed = new MessageEmbed()
    .setColor(client.config.colors.heptagram)
    .setTitle("A coin was flipped..")
    .setTimestamp()
    .setFooter({
      text: `Message sent by Heptagram || ${pjson.version}`,
      iconURL: `${client.config.cdn.sqlogo}`,
    });

  const number = Math.floor(Math.random() * 2);

  if (number === 0) embed.addField("Result", "`Heads`");
  else embed.addField("Result", "`Tails`");

  message.reply({ embeds: [embed] });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
};

exports.help = {
  name: "coinflip",
  category: "Fun",
  description: "coinflip",
  usage: "coinflip",
};
