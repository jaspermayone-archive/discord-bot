
const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');

module.exports = {
    name: 'support',
    guildOnly: true,
    description: "sends a link for the bot support server",
    category: "Resources",

    execute({ message, Discord, roles }) {

        if (message.member.roles.cache.has(roles.admin)) {

            const inviteEmbed = new Discord.MessageEmbed()
                .setColor(colors.heptagram)
                .setTitle('Need some help with the Heptagram Bot?')
                .setDescription('Join our discord server at https://discord.gg/HSupF99kpq')
                .setFooter('This is for Heptagram Bot help only. For server specific help, contact a Modarator or Admin.');

            message.channel.send(inviteEmbed);

        } else {

            const userEmbed = new Discord.MessageEmbed()
                .setColor(colors.heptagram)
                .setTitle('Need some help with the Heptagram Bot?')
                .setDescription('Need help with the Heptagram Bot? Have someone with Admin or Modarator permissions in this server run this command')
                .setFooter('This is for Heptagram Bot help only. For server specific help, contact a Modarator or Admin.');

            message.channel.send(userEmbed);
        }
    }
}