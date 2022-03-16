const { MessageEmbed } = require("discord.js");
const { colors } = require("../config/config.json");
const pjson = require("../../package.json");

exports.run = async (client, message, args, level) => {
  const numberinsttext = new MessageEmbed()
    .setColor(colors.heptagram)
    .setTitle(`Incorect Usage!`)
    .setDescription("Please enter a number instead of text.")
    .setTimestamp()
    .setFooter({
      text: `Message sent by Heptagram || ${pjson.version}`,
      iconURL: `${client.config.cdn.sqlogo}`,
    });

  const slowdown = new MessageEmbed()
    .setColor(colors.heptagram)
    .setTitle(`Slow Down!`)
    .setDescription(
      "This command resticts to 10 messages per command for safety."
    )
    .setTimestamp()
    .setFooter({
      text: `Message sent by Heptagram || ${pjson.version}`,
      iconURL: `${client.config.cdn.sqlogo}`,
    });

  const twomsgs = new MessageEmbed()
    .setColor(colors.heptagram)
    .setTitle(`Not enough messages.`)
    .setDescription("You must delete at least 2 messages.")
    .setTimestamp()
    .setFooter({
      text: `Message sent by Heptagram || ${pjson.version}`,
      iconURL: `${client.config.cdn.sqlogo}`,
    });

  // make the deleted embed actually send
    const deleted = new MessageEmbed()
    .setColor(colors.heptagram)
    .setTitle(`:white_check_mark: **Success!** :white_check_mark:`)
    .setDescription(`You have succesfully deleted ${args[0]} messages.`)
    .addFields({
      name: '**PLEASE NOTE:**',
      value:
        'This will only delete messages that are under 14 days old. ',
      inline: true,
    })
    .setTimestamp()
    .setFooter({
      text: `Message sent by Heptagram || ${pjson.version}`,
      iconURL: `${client.config.cdn.sqlogo}`,
    });

  if (isNaN(args[0])) return message.reply({ embeds: [numberinsttext] });

  if (args[0] > 10) return message.reply({ embeds: [slowdown] });
  if (args[0] < 2) return message.reply({ embeds: [twomsgs] });

  await message.channel.messages.fetch({ limit: args[0] }).then((messages) => {
    message.channel.bulkDelete(messages).finally(() => {
      // this doesnt work rn.
      //return message.reply({ embeds: [deleted] });
    });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator",
};

exports.help = {
  name: "clear",
  category: "Moderation",
  description: "clears messages",
  usage: "clear <number of messages you want to clear>",
};
