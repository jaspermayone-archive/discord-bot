
const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');

module.exports = {
    name: 'invite',
    guildOnly: false,
    description: "sends the bot invite link",
    category: "Resources",

    execute({ message, Discord, args }) {
        const embed = new Discord.MessageEmbed()
            .setTitle("Bot Invite :robot:")
            .setColor(colors.heptagram)
            //const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');
            .setDescription(`Heptagram is not yet avaible to be invited to servers. Follow our v1 realese updates channel for updates.`)
        message.channel.send(embed);
    }
       // message.channel.send('You can invite Heptagram to your server at https://discord.com/oauth2/authorize?client_id=783073095036043274&permissions=8&scope=bot');
}