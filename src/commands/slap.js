const { MessageEmbed } = require("discord.js");
const pjson = require("../../package.json");
const { settings } = require("../utils/settings.js");

exports.run = async (client, message, args, level) => {
  const prefix = settings.get(message.guild.id).prefix;

  // get mention from message args
  const member = message.mentions.users.first();

  if (args < 1) {
    return message.reply("You need to mention someone to slap them!");
  }

  if (member === message.author) {
    return message.reply("You can't slap yourself silly!");
  }

  if (member === client.user.id) {
    return message.reply("I can't slap myself. Plus I don't like it. Duh.");
  }

  const embed = new MessageEmbed()
    .setColor(client.config.colors.heptagram)
    .setTitle(
      `${message.author.username} slapped :raised_back_of_hand: ${member}`
    )
    .setDescription(`${member}is now in the hospital! :hospital:`)
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
  permLevel: "User",
};

exports.help = {
  name: "slap",
  category: "Fun",
  description: "Slaps a user",
  usage: "slap <@user you want to slap>",
};
