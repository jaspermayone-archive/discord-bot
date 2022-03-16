const { settings } = require("../utils/settings.js");
const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, level) => { 
  const { container } = client;
  const replying = settings.ensure(message.guild.id, client.intents.defaultSettings).commandReply;
  if (!args || args.length < 1) return message.reply("Must provide a command name to reload.");
  const command = container.commands.get(args[0]) || container.commands.get(container.aliases.get(args[0]));
  if (!command) {
    return message.reply("That command does not exist");
  }
  delete require.cache[require.resolve(`./${command.help.name}.js`)];
  container.commands.delete(command.help.name);
  const props = require(`./${command.help.name}.js`);
  container.commands.set(command.help.name, props);

  message.reply({ content: `<a:verifyblack:951863095238754324> The command \`${command.help.name}\` has been reloaded <a:verifyblack:951863095238754324>`, allowedMentions: { repliedUser: (replying === "true") }});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "reload",
  category: "System",
  description: "Reloads a command that\"s been modified.",
  usage: "reload [command]"
};