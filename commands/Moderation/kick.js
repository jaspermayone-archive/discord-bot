//This is the kick command. The kick command kicks members from the guild.
// This command is admin resticted. To see how to resrict a command go to the admin.js file.

module.exports = {
    name: 'kick',
    description: "kicks users",
    guildOnly: true,
    execute({ message, roles }) {
        const member = message.mentions.users.first();

        if (message.member.roles.cache.has(roles.admin)) {
            if (member) {
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