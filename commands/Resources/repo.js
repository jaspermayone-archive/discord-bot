
const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');

module.exports = {
    name: 'repo',
    guildOnly: false,
    description: "sends the bot repo link",
    category: "Resources",

    execute({ message, Discord, args }) {
        const embed = new Discord.MessageEmbed()
            .setTitle("Bot Repo :robot:")
            .setColor(colors.heptagram)
            .setDescription(`Heptagram is proud to be open source! You can find our GitHub repo at https://github.com/Heptagram-Bot/Heptagram`)
            .setFooter(`Thanks for cosidering contributing!`)
        message.channel.send(embed);
    }
}