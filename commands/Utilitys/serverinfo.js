
module.exports = {
    name: 'serverinfo',
    description: "gives info about server.",
    guildOnly: true,
    guildOnly: true,
    execute({ message, args, roles }) {
        message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
    }
}