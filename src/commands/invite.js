const Discord = require("discord.js");
const { invites, colors } = require("../config/config.json");
const pjson = require("../../package.json");

exports.run = async (client, message, args, level) => {
  const embed = new Discord.MessageEmbed()
    .setTitle(":robot: Bot Invite :robot:")
    .setColor(client.config.colors.heptagram)
    .setDescription(
      `You can invite Heptagram to your server [here](${invites.bot}).`
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
  permLevel: "User",
};

exports.help = {
  name: "invite",
  category: "System",
  description: "sends link to invite bot to server",
  usage: "invite",
};
