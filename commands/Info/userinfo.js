
const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');

module.exports = {
    name: 'userinfo',
    description: "gives info about user.",
    category: "Info",
    
    execute({ message, Discord, args }) {
        const embed = new Discord.MessageEmbed()
            .setTitle("User Info :person_curly_hair:")
            .setColor(colors.heptagram)
            //const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');
            .setDescription(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`)
        message.channel.send(embed);
    }
}