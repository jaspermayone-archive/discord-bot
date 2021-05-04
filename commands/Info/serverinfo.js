
const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');

module.exports = {
    name: 'serverinfo',
    description: "gives info about server.",
    guildOnly: true,
    category: "Info",
    
    execute({ message, Discord, args }) {
        const embed = new Discord.MessageEmbed()
            .setTitle("Bot Info :robot:")
            .setColor(colors.heptagram)
            //const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');
            .setDescription(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`)
        message.channel.send(embed);
    }
}