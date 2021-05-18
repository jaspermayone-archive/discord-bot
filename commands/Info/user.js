
const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');

module.exports = {
    name: 'userinfo',
    description: "gives info about user.",
    category: "Info",

    execute({ message, Discord, args }) {
        let user = message.mentions.users.first() || message.author;

        const joinDiscord = moment(user.createdAt).format('llll');
        const joinServer = moment(user.joinedAt).format('llll');
        
        const embed = new Discord.MessageEmbed()
        .setAuthor(user.username + '#' + user.discriminator, user.displayAvatarURL)
        .setTitle("User Info :")
        .setThumbnail(`${user.displayAvatarURL}`)
        .addField('Joined at:', `${moment.utc(user.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
        .addField('Status:', user.presence.status, true)
        .addField('Roles:', user.roles.map(r => `${r}`).join(' | '), true)
        .setFooter(`ID: ${user.id}`)
        .setTimestamp()
        .setColor(colors.heptagram)
        .setDescription(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`)
        
        message.channel.send(embed);
}
}