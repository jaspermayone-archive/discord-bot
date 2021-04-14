//This is the ping command. The ping command currently just returns pong.
// We would like to have it give the bot ping in the future.

module.exports = {
  name: 'ping',
  guildOnly: false,
  description: "this is a ping command!",
  execute({ discord, client, message, roles }) {
    //        message.channel.send(new Date().getTime() - message.createdTimestamp + " ms");        

    let ping = message.createdTimestamp - message.createdTimestamp;
    message.channel.send(`Bot Latency: \`${ping}ms\`, API Latency: \`${Math.round(message.client.ws.ping)}ms\` Websocket Heartbeat: \`${client.ws.ping}ms.\``);
  }
}