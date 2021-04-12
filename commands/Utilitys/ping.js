//This is the ping command. The ping command currently just returns pong.
// We would like to have it give the bot ping in the future.

module.exports = {
    name: 'ping',
    guildOnly: false,
    description: "this is a ping command!",
    execute({ discord, client, message, roles }) {
        message.channel.send('pong!');
        message.channel.send(`Websocket heartbeat: ${client.ws.ping}ms.`);

    }
}