const { MessageEmbed } = require("discord.js");
const pjson = require("../../package.json");
const { settings } = require("../utils/settings.js");

exports.run = async (client, message, args, level) => {
  const prefix = settings.get(message.guild.id).prefix;

  const apimigrationembed = new MessageEmbed()
    .setTitle("API Migration")
    .setDescription(`API Migrations are currently in progress to our first party API. Please try again later. For more info, run \`${prefix}api\``)
    .setColor(client.config.colors.heptagram)
    .setTimestamp()
    .setFooter({
      text: `Message sent by Heptagram || ${pjson.version}`,
      iconURL: `${client.config.cdn.sqlogo}`,
    });
  message.reply({ embeds: [apimigrationembed] });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
};

exports.help = {
  name: "cat",
  category: "Fun",
  description: "Sends a random image of a cat",
  usage: "cat",
};
