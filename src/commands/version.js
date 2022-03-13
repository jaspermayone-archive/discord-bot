const { Discord, MessageEmbed } = require('discord.js');
const { colors } = require('../config/config.json');
const pjson = require('../../package.json');

exports.run = async (client, message, args, level) => {
    const embed = new MessageEmbed()
    .setColor(colors.heptagram)
    .setTitle(`Hey J-dogcoder! Here are my current versions.`)
    .addFields(
      {
        name: 'Node Version:',
        value: `${process.versions.node}`,
        inline: true,
      },
      { name: 'Bot Version:', value: `${pjson.version}`, inline: true },
    )
    .setTimestamp();

  message.reply({ embeds: [embed] });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["v"],
  permLevel: "Owner"
};

exports.help = {
  name: "version",
  category: "Owner",
  description: "gets the version of the bot.",
  usage: "version"
};

