const { MessageEmbed } = require("discord.js");
const { colors, repos } = require("../config/config.json");
const pjson = require("../../package.json");

exports.run = async (client, message, args, level) => {
  if (args.length < 1) {
    const embed = new MessageEmbed()
      .setTitle("Bot Repo :robot:")
      .setColor(client.config.colors.heptagram)
      .setDescription(
        `Heptagram is proud to be open source! You can find our Bot's GitHub repo at ${repos.bot}`
      )
      .setTimestamp()
.setFooter({
      text: `Message sent by Heptagram || ${pjson.version}`,
      iconURL: `${client.config.cdn.sqlogo}`,
    });

    message.reply({ embeds: [embed] });
  } else {
    if (args[0] === "bot") {
      const embed = new MessageEmbed()
        .setTitle("Bot Repo :robot:")
        .setColor(client.config.colors.heptagram)
        .setDescription(
          `Heptagram is proud to be open source! You can find our Bot's GitHub repo at ${repos.bot}`
        )
        .setTimestamp()
.setFooter({
      text: `Message sent by Heptagram || ${pjson.version}`,
      iconURL: `${client.config.cdn.sqlogo}`,
    });

      message.reply({ embeds: [embed] });
    } else if (args[0] === "website") {
      const embed = new MessageEmbed()
        .setTitle("Website Repo :robot:")
        .setColor(client.config.colors.heptagram)
        .setDescription(
          `Heptagram is proud to be open source! You can find our Website's GitHub repo at ${repos.website}`
        )
        .setTimestamp()
.setFooter({
      text: `Message sent by Heptagram || ${pjson.version}`,
      iconURL: `${client.config.cdn.sqlogo}`,
    });

      message.reply({ embeds: [embed] });
    } else {
        message.reply(`${args[0]} is not a valid repo.`);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['opensource', 'os'],
  permLevel: "User",
};

exports.help = {
  name: "repo",
  category: "Info",
  description: "sends the bot repo link",
  usage: "repo <optional bot or website>",
};
