
const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');

module.exports = {
    name: 'server',
    description: "gives info about server.",
    guildOnly: true,
    category: "Resources",

    execute({ message, Discord, args }) {
        const embed = new Discord.MessageEmbed()
            .setTitle("Bot Info :robot:")
            .setColor(colors.heptagram)
            .setDescription(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`)
        message.channel.send(embed);
    }
}