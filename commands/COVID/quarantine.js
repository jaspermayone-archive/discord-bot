
const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');

module.exports = {
    name: 'quarantine',
    guildOnly: false,
    description: "gets covid stats",
    category: "COVID",
    
    execute({ message, Discord, args }) {
        const embed = new Discord.MessageEmbed()
            .setTitle("COVID Police: 🚨")
            .setColor(colors.heptagram)
            //const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');
            .setDescription('Hi there, this is the state calling to inform you that you have come into close contact with somebody who has contracted the COVID-19 disease. Please quarantine untill further notice.')
        message.channel.send(embed);
    }
}
