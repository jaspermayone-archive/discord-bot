//This is the unmute command. The unmute command unmutes users that have been muted.
// This command is admin resticted. To see how to resrict a command go to the admin.js file.

const ms = require('ms');
module.exports = {
    name: 'unmute',
    description: "unmutes user",
    execute({ message, roles }) {

        if (message.member.roles.cache.has(roles.admin)) {

            const target = message.mentions.users.first();
            if (target) {
                let mainRole = message.guild.roles.cache.get(roles.users);
                let muteRole = message.guild.roles.cache.get(roles.muted);

                let memberTarget = message.guild.members.cache.get(target.id);

                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);
                message.channel.send(`<@${memberTarget.user.id}> has been unmuted`);
            } else {
                message.reply('Please specify a user to unmute!');
            }

        } else {
            message.channel.send('Sorry, this command is resticted!');
        }
    }
}