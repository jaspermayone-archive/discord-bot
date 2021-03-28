const ms = require('ms');
module.exports = {
    name: 'unmute',
    description: "unmutes user",
    execute(message, args, Discord) {

        if (message.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) {

            const target = message.mentions.users.first();
            if(target){
                let mainRole = message.guild.roles.cache.find(role => role.name === 'User');
                let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
     
                let memberTarget= message.guild.members.cache.get(target.id);
     
                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been unmuted`);
            } else{
                message.reply('Please specify a user to unmute!');
            }

        } else {
            message.channel.send('Sorry, this command is resticted!');
        }
    }
}