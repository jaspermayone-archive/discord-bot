
const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');

module.exports = {
    name: 'uptime',
    description: "gets server uptime",
    guildOnly: false,
    category: "Utilitys",

    execute({ message, client, roles, Discord, args }) {

        let days = 0
        let week = 0
        let uptime = '';
        let totalSeconds = (client.uptime / 1000)
        let hours = Math.floor(totalSeconds / 3600)
        totalSeconds %= 3600
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = Math.floor(totalSeconds % 60)
        if (hours > 24) {
        days = days + 1
        hours = 0
                }
        if (week - 0) {
        uptime += `${week} week, `
                }
        if (minutes > 60) {
        minutes = 0;
                }
        uptime += `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`

        const embed = new Discord.MessageEmbed()
          .setTitle("Bot Uptime :robot:")
          .setColor(colors.heptagram)
          //const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');
          .setDescription(`Bot Uptime: \`${uptime}\``)
        message.channel.send(embed);
      }
}