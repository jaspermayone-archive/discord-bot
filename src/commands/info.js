const { MessageEmbed } = require("discord.js");

const { colors } = require("../config/config.json");
const { settings } = require("../utils/settings.js");
const pjson = require("../../package.json");
const { defaultConfiguration } = require("express/lib/application");

exports.run = async (client, message, args, level) => {
  let prefix = settings.get(message.guild.id).prefix;

  const embed = new MessageEmbed()
    .setTitle("Heptagram Bot Info:")
    .setColor(client.config.colors.heptagram)
    .setDescription(
      "This is the Heptagram discord bot. Heptagram is the open-source multipurpose discord bot with the goal to be the single needed bot for any server."
    )
    .addFields(
      {
        name: "Bot Help:",
        value: `You can run \`${prefix}repo\` for our repo, \`${prefix}support\` for a link to our support server, or \`${prefix}server\` for stats and info about this server. `,
        inline: true,
      },
      {
        name: "More info:",
        value:
          "You can find out more about Heptagram in our support server or on our GitHub Repository.",
        inline: true,
      }
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
  name: "info",
  category: "Info",
  description: "Displays info about the bot.",
  usage: "info",
};
