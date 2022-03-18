const { settings } = require("../utils/settings.js");
const { colors } = require('../config/config.json');
const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

  const embed = new MessageEmbed()
  .setColor(client.config.colors.heptagram)
  .setTitle(
    `<:status_offline:852483939955769375> **Bot Restarting!** <:status_offline:852483939955769375>`,
  )
  .setDescription(`The bot has been qued to restart.`)
  .setTimestamp()
.setFooter({
      text: `Message sent by Heptagram || ${pjson.version}`,
      iconURL: `${client.config.cdn.sqlogo}`,
    });

await Promise.all(client.container.commands.map(cmd => {
    // the path is relative to the *current folder*, so just ./filename.js
    delete require.cache[require.resolve(`./${cmd.help.name}.js`)];
    // We also need to delete and reload the command from the container.commands Enmap
    client.container.commands.delete(cmd.help.name);
  }))

await message.reply({ embeds: [embed] }).then(() => {
  client.destroy();
  process.exit();
});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["restart"],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "reboot",
  category: "System",
  description: "Shuts down the bot. If running under PM2, bot will restart automatically.",
  usage: "reboot"
};
