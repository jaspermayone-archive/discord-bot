const { MessageEmbed } = require("discord.js");
const pjson = require("../../package.json");
const { settings } = require("../utils/settings.js");

exports.run = async (client, message, args, level) => {
  const prefix = settings.get(message.guild.id).prefix;

  const apimigrationembed = new MessageEmbed()
  .setTitle("API Migration")
  .setDescription(`API Migrations are currently in progress to our first party API. Please try again later. For more info, run \`${prefix}api\``)
  .addField('Are you a bot developer or coder? Do you have knowledge about API creation and development? If so, please join the discord server and ask for J-dogcoder', `${client.config.invites.server}`)
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
  name: "moviequote",
  category: "Fun",
  description: "Sends a random movie quote.",
  usage: "moviequote",
};
