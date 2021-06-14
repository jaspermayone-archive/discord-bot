
const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');

module.exports = {
  name: 'ping',
  guildOnly: false,
  category: "Utilitys",
  description: "returns bot ping.",

  execute({ message, client, roles, Discord, args }) {

    let ping = message.createdTimestamp - message.createdTimestamp;

    const embed = new Discord.MessageEmbed()
      .setTitle("Bot Ping :robot:")
      .setColor(colors.heptagram)
      .setDescription(`Bot Latency: \`${ping}ms\`, API Latency: \`${Math.round(message.client.ws.ping)}ms\` Websocket Heartbeat: \`${client.ws.ping}ms.\``)
    message.channel.send(embed);
  }
}