const { settings } = require("../utils/settings.js");
const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, level) => {
  const friendly = client.intents.permLevels.find(l => l.level === level).name;
  const replying = settings.ensure(message.guild.id, client.intents.defaultSettings).commandReply;
  message.reply({ content: `\`Your permission level is: ${level} - ${friendly}\``, allowedMentions: { repliedUser: (replying === "true") }});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["level", "mypermslevel","mypermlevel", "perms", "myperms"],
  permLevel: "User"
};

exports.help = {
  name: "mypermlevel",
  category: "System",
  description: "Tells you your permission level for the current message location.",
  usage: ["mypermlevel"]
};
