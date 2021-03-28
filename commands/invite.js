module.exports = {
    name: 'invite',
    description: "sends server invite link",
    execute(message, args, Discord){

        if(message.member.roles.cache.has('825176015562997781')){
            message.channel.send('The public server invite link is https://discord.gg/TRDdJ3WNjk');
        
        } else {
            message.channel.send('Sorry, this command is resticted!');
           }
    }
}