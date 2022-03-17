const { MessageEmbed } = require("discord.js");
const { colors } = require("../config/config.json");
const pjson = require("../../package.json");

exports.run = async (client, message, args, level) => {
  function getUserFromMention(mention) {
    if (!mention) return;

    if (mention.startsWith("<@") && mention.endsWith(">")) {
      mention = mention.slice(2, -1);

      if (mention.startsWith("!")) {
        mention = mention.slice(1);
      }

      return client.users.cache.get(mention);
    }
  }

  const user = getUserFromMention(args[0]);
  if (!user) {
    return message.reply(
      "Please use a proper mention if you want to kick someone."
    );
  }
let reason

  if (args.length === 1) {
  reason = args.slice(1).join(" ");
  } else {
    reason = "No reason provided.";
  }

  const kickembed = new MessageEmbed()
    .setColor(client.config.colors.heptagram)
    .setTitle(`:white_check_mark: **Success!** :white_check_mark:`)
    .setDescription(
      `Successfully kicked **${user.tag}** from the server! || Reason: ${reason}.`
    )
    .setTimestamp()
    .setFooter({
      text: `Message sent by Heptagram || ${pjson.version}`,
      iconURL: `${client.config.cdn.sqlogo}`,
    });;

  const errorembed = new MessageEmbed()
    .setColor(client.config.colors.heptagram)
    .setTitle(`**Failed**`)
    .setDescription(`Failed to kick **${user.tag}**.`)
    .setTimestamp()
    .setFooter({
      text: `Message sent by Heptagram || ${pjson.version}`,
      iconURL: `${client.config.cdn.sqlogo}`,
    });
  
  try {
    await message.guild.members.kick(user, { reason });
  } catch (error) {
    return message.reply({ embeds: [errorembed] });
  }

  return message.reply({ embeds: [kickembed] });
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator",
};

exports.help = {
  name: "kick",
  category: "Moderation",
  description: "kicks users",
  usage: "kick <@user you want to kick> <reason>",
};
