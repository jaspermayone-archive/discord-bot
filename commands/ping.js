module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    execute(message, args, Discord){
        message.channel.send('pong!');
    }
}