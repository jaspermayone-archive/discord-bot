
const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');

module.exports = {
    name: 'info',
    description: "Displays info about bot.",
    guildOnly: true,
    category: "Bot Info",

    execute({ Discord, client, message, roles }) {

        const embed = new Discord.MessageEmbed()
        .setTitle("Heptagram Bot Info:")
        .setColor(colors.heptagram)
        //const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');
        .setDescription(`This is the Heptagram discord bot. Heptagram is the open-source multipurpose discord bot with the goal to be the single needed bot for any server.`)
        .addFields(
            { name: 'Bot Help:', value: `Run \`${prefix}repo\` for our repo, or \`${prefix}server\` for a link to our support server. `, inline: true },
            { name: 'More info:', value: `You can find out more about Heptagram in our support server or on our GitHub Repository.`, inline: true },
        )
        message.channel.send(embed);

    }
}