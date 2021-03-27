module.exports = {
    name: 'github',
    description: "sends github link",
    execute(message, args){
        message.channel.send('https://github.com/Pluto-Ai');
    }
}