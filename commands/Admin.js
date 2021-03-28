module.exports = {
    name: 'admin',
    description: "admin example",
    execute(message, args, Discord){

        if(message.member.roles.cache.has('825176015562997781')){
        message.channel.send('This is an admin command example');
    
    } else {
        message.channel.send('Sorry, this command is resticted!');
       }
    }
}