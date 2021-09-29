const { colors, cdn } = require('../../config.json');
const { MessageEmbed } = require('discord.js');
const pjson = require('../../package.json');

module.exports = {
  name: 'stats',
  aliases: ['st', 'botstats'],
  description: 'Displays bot stats',
  category: 'Owner',
  ownerOnly: true,
  hidden: true,

  callback: async ({ message, client }) => {
    const BotPlatform = process.platform;
    const MemoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
    const MemoryUsed = Math.trunc(MemoryUsage);
    const RamUsed = Math.round(process.cpuUsage().system) / 1024;
    const RamUsage = Math.trunc(RamUsed);
    const SystemPing = Math.round(client.ws.ping);

    const embed = new MessageEmbed()
      .setColor(colors.heptagram)
      .setTitle("Bot's Live Status")
      .addField(
        ' \u200B ',
        'Channels** : ` ' + `${client.channels.cache.size}` + ' `',
      )
      .addField(
        ' \u200B ',
        '**Servers** : ` ' + `${client.guilds.cache.size}` + ' `',
      )
      .addField(
        ' \u200B ',
        '**Users** : ` ' + `${client.users.cache.size}` + ' `',
      )
      .addField(' \u200B ', '**CPU Usage** :  ` ' + RamUsage + 'Mb `')
      .addField(' \u200B ', '**Memory Usage** :  ` ' + MemoryUsed + 'Mb `')
      .addField(' \u200B ', '**Bot Platform** :  ` ' + BotPlatform + ' `')
      .addField(' \u200B ', '**System Ping** :  ` ' + SystemPing + ' `')

      .setTimestamp()
      .setFooter(
        `Message sent by the Heptagram Bot || ${pjson.version}`,
        `${cdn.sqlogo}`,
      );

    message.reply({ embeds: [embed] });
  },
};
