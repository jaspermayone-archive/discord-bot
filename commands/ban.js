module.exports = {
    name: 'ban',
    description: "bans users",
    execute(message, args, Discord){
        const member = message.mentions.users.first();
        
        if(message.member.roles.cache.has(process.env.ADMIN_ID)){
            if(member){
                const memberTarget = message.guild.members.cache.get(member.id)
                memberTarget.ban()
                message.reply("The user has been banned.")
                        } else {
                            message.reply('Please specify a user to ban.')
                        }
        } else {
            message.channel.send('Sorry, this command is resticted!');
           }

    }
}