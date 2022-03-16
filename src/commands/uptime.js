const Discord = require('discord.js');
const { colors } = require('../config/config.json');
const pjson = require('../../package.json');

exports.run = async (client, message, args, level) => {
    const seconds = Math.round(process.uptime());
    const days = seconds >= 86400 ? Math.floor(seconds / 86400) : 0;
    const hours =
      seconds >= 3600 ? Math.floor((seconds - days * 86400) / 3600) : 0;
    const minutes =
      seconds >= 60
        ? Math.floor((seconds - days * 86400 - hours * 3600) / 60)
        : 0;
    const secondsRemain = seconds - days * 86400 - hours * 3600 - minutes * 60;

    const uptimeEmbed = new Discord.MessageEmbed()
      .setTitle('Heptagram Uptime:')
      .setColor(colors.heptagram)
      .addFields(
        { name: 'Days', value: `${days}`, inline: true },
        { name: 'Hours', value: `${hours}`, inline: true },
        { name: 'Minutes', value: `${minutes}`, inline: true },
        { name: 'Seconds', value: `${secondsRemain}`, inline: true },
      )
      .setTimestamp()    
.setFooter({
      text: `Message sent by Heptagram || ${pjson.version}`,
      iconURL: `${client.config.cdn.sqlogo}`,
    });

    message.reply({ embeds: [uptimeEmbed] });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "uptime",
  category: "Info",
  description: "gets bot uptime.",
  usage: "uptime"
};

