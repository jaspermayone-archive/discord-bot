const logger = require("../utils/Logger.js");
const { getSettings, permlevel } = require("../utils/functions.js");
const config = require("../config.js");
const { MessageEmbed } = require('discord.js');


module.exports = async (client, message) => {
  const { container } = client;

  if (process.env.NODE_ENV === "production" && message.guild.id === `${process.env.TEST_GUILD_ID}`) {
    return;
  }
  if (process.env.NODE_ENV === "development" && message.guild.id === `${process.env.HOME_GUILD_ID}`) {
    return;
  }

  if (message.author.id === process.env.OWNER_ID) {
    const reactionEmoji = client.emojis.cache.get(config.emoji.HeptaLove);
    await message.react(reactionEmoji);

    //    const animatedEmoji = client.emojis.cache.find(emoji => emoji.id === "951855035610972210");
    //    message.react(animatedEmoji);
  }

  if (message.author.bot) return;

  const settings = (message.settings = getSettings(message.guild));

  const prefixMention = new RegExp(`^<@!?${client.user.id}> ?$`);
  if (message.content.match(prefixMention)) {
    return message.reply(
      `Hey there <@!${message.author.id}>! Need some help? I am here to assist you. My prefix on this server is \`${settings.prefix}\`. You can run \`${settings.prefix}\help\` to see what I can do!`
    );
  }

  const prefix = new RegExp(
    `^<@!?${client.user.id}> |^\\${settings.prefix}`
  ).exec(message.content);
  if (!prefix) return;

  const args = message.content.slice(prefix[0].length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (message.guild && !message.member)
    await message.guild.members.fetch(message.author);

  const level = permlevel(message);

  const cmd =
    container.commands.get(command) ||
    container.commands.get(container.aliases.get(command));
  if (!cmd) return;

  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send(
      "This command is not available in DMs! Please run this command in a server."
    );

  if (!cmd.conf.enabled) return;

  if (level < container.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === "true") {
      return message.channel
        .send(`You do not have permission to use this command.
Your permission level is ${level} (${
        config.permLevels.find((l) => l.level === level).name
      })
This command requires level ${container.levelCache[cmd.conf.permLevel]} (${
        cmd.conf.permLevel
      })`);
    } else {
      return;
    }
  }

  message.author.permLevel = level;

  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }
  try {
    await cmd.run(client, message, args, level);
  } catch (e) {
    console.error(e);
    message.channel
      .send({
        content: `There was a problem with your request. Please contact a developer in our support server for assistance. You can run \`${settings.prefix}support\` for an invite if needed.\` \n\`\`\`${e.message}\`\`\``,
      })
      .catch((e) => console.error("An error occurred replying on an error", e));
  }
};
