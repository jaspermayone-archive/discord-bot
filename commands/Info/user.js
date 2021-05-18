
const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');

module.exports = {
    name: 'user',
    description: "gives info about user.",
    category: "Info",

    execute({ message, Discord, args }) {
        const embed = new Discord.MessageEmbed()
        .setTitle(`User Info for ${message.author.username}`)
        .setColor(colors.heptagram)
        .setDescription(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`)
    message.channel.send(embed);
}
}