//This is the ping command. The ping command currently just returns pong.
// We would like to have it give the bot ping in the future.

module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    execute({ message, roles }) {
        message.channel.send('pong!');
    }
}