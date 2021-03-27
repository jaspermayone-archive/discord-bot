module.exports = {
    name: 'github',
    description: "sends github link",
    execute(message, args){

        if(message.member.roles.cache.has('825176015562997781')){
        message.channel.send('https://github.com/Pluto-Ai');
    }
}
}