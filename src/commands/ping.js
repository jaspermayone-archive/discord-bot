const Discord = require('discord.js');
const { config, colors } = require('../config/config.json');
const pjson = require('../../package.json');

exports.run = async (client, message, args, level) => {
    const embed = new Discord.MessageEmbed()
    .setTitle(
      "<:status_online:951855000605298708> Heptagram Pings <:status_online:951855000605298708>",
    )
    .setColor(colors.heptagram)
    .setDescription(``)
    .addFields(
      {
        name: 'Heptagram Bot Latency:',
        value: `🏓 Bot latency is \`${
          message.createdTimestamp - message.createdTimestamp
        }ms.\``,
        inline: false,
      },
      {
        name: 'Discord API Latency:',
        value: `\`${Math.round(message.client.ws.ping)}ms\``,
        inline: false,
      },
      {
        name: 'Discord Websocket Heartbeat:',
        value: `\`${client.ws.ping}ms.\``,
        inline: false,
      },
    )
    .addFields(
      {
        name: 'Heptagram API:',
        value: 'Ping coming soon!',
        inline: false,
      },
      {
        name: 'Heptagram CDN:',
        value: `CDN Ping coming soon.`,
        inline: false,
      },
    )
    .setTimestamp()    
.setFooter({
      text: `Message sent by Heptagram || ${pjson.version}`,
      iconURL: `${client.config.cdn.sqlogo}`,
    });

  message.reply({ embeds: [embed] });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "ping",
  category: "Utilities",
  description: "Returns various ping informaton for Heptagram.",
  usage: "ping"
};

