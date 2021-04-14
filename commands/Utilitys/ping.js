module.exports = {
  name: 'ping',
  guildOnly: false,
  description: "returns bot ping.",
  execute({ discord, client, message, roles }) {
    //        message.channel.send(new Date().getTime() - message.createdTimestamp + " ms");        

    let ping = message.createdTimestamp - message.createdTimestamp;
    message.channel.send(`Bot Latency: \`${ping}ms\`, API Latency: \`${Math.round(message.client.ws.ping)}ms\` Websocket Heartbeat: \`${client.ws.ping}ms.\``);
  }
}