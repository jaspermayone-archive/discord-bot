const { MessageEmbed } = require("discord.js");
const pjson = require("../../package.json");
const { settings } = require("../utils/settings.js");

exports.run = async (client, message, args, level) => {
  let prefix = settings.get(message.guild.id).prefix;

  const numberinsttext = new MessageEmbed()
    .setColor(client.config.colors.heptagram)
    .setTitle(`Incorect Usage!`)
    .setDescription("Please enter a number instead of text.")
    .setTimestamp()
    .setFooter({
      text: `Message sent by Heptagram || ${pjson.version}`,
      iconURL: `${client.config.cdn.sqlogo}`,
    });

  const slowdown = new MessageEmbed()
    .setColor(client.config.colors.heptagram)
    .setTitle(`Slow Down!`)
    .setDescription(
      "This command resticts to 100 messages per command for safety."
    )
    .setTimestamp()
    .setFooter({
      text: `Message sent by Heptagram || ${pjson.version}`,
      iconURL: `${client.config.cdn.sqlogo}`,
    });

  const elevenmsgs = new MessageEmbed()
    .setColor(client.config.colors.heptagram)
    .setTitle(`Not enough messages.`)
    .setDescription(
      `You must delete at least 11 messages. Please use ${prefix}clear for smaller jobs.`
    )
    .setTimestamp()
    .setFooter({
      text: `Message sent by Heptagram || ${pjson.version}`,
      iconURL: `${client.config.cdn.sqlogo}`,
    });

  if (isNaN(args[0])) return message.reply({ embeds: [numberinsttext] });

  if (args[0] > 100) return message.reply({ embeds: [slowdown] });
  if (args[0] < 11) return message.reply({ embeds: [elevenmsgs] });

  await message.channel.messages
    .fetch({ limit: args[0] })
    .then((messages) => {
      message.channel.bulkDelete(messages);
    })
    .finally(() => {
      const embed = new MessageEmbed()
        .setColor(client.config.colors.heptagram)
        .setTitle(`:white_check_mark: **Success!** :white_check_mark:`)
        .setDescription(`You have succesfully wiped ${args[0]} messages.`)
        .addFields({
          name: "**PLEASE NOTE:**",
          value:
            "This will only delete messages that are under `14` days old, due to Discord's API limitations/restrictions.",
          inline: true,
        })
        .setTimestamp()
        .setFooter({
          text: `Message sent by Heptagram || ${pjson.version}`,
          iconURL: `${client.config.cdn.sqlogo}`,
        });

      return message.channel.send({ embeds: [embed] });
    });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator",
};

exports.help = {
  name: "wipe",
  category: "Moderation",
  description: "clear command, but with bigger options",
  usage: "wipe <number of messages you want to clear>",
};
