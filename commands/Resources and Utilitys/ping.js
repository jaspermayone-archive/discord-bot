const Discord = require('discord.js');
const { colors, cdn } = require('../../config.json');
const pjson = require('../../package.json');

module.exports = {
  name: 'ping',
  aliases: ['p'],
  category: 'Utilitys',
  description: 'returns bot ping.',
  minArgs: 0,
  maxArgs: 0,
  expectedArgs: '',
  cooldown: '1m',

  callback: ({ message, client }) => {
    const embed = new Discord.MessageEmbed()
      .setTitle(
        `<:status_online:852483940291706900> Heptagram Pings <:status_online:852483940291706900>`,
      )
      .setColor(colors.heptagram)
      .setDescription(``)
      .addFields(
        {
          name: 'Heptagram Bot Latency:',
          value: `🏓 Bot latency is \`${
            message.createdTimestamp - message.createdTimestamp
          }ms.\``,
          inline: true,
        },
        {
          name: 'Discord API Latency:',
          value: `\`${Math.round(message.client.ws.ping)}ms\``,
          inline: true,
        },
        {
          name: 'Discord Websocket Heartbeat:',
          value: `\`${client.ws.ping}ms.\``,
          inline: true,
        },
      )
      .addFields(
        {
          name: '<:HeptrgramAPI:874269108919750766> Heptagram API:',
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
      .setFooter(
        `Message sent by the Heptagram Bot || ${pjson.version}`,
        `${cdn.sqlogo}`,
      );

    message.reply({ embeds: [embed] });
  },
};
