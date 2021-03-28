module.exports = {
    name: 'github',
    description: "sends github link",
    execute(message, args, Discord){

        message.channel.send('https://github.com/Pluto-Ai');

    }
}