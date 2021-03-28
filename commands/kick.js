module.exports = {
    name: 'kick',
    description: "kicks users",
    execute(message, args, Discord){
        const member = message.mentions.users.first();
        
        if(message.member.roles.cache.has('825176015562997781')){
            if(member){
                const memberTarget = message.guild.members.cache.get(member.id)
                memberTarget.kick()
                message.reply("The user has been kicked.")
                        } else {
                            message.reply('Please specify a user to kick.')
                        }
        } else {
            message.channel.send('Sorry, this command is resticted!');
           }

    }
}