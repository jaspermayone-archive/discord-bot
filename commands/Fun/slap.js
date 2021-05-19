const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');
const Discord = require('discord.js');

module.exports = {
    name: "slap",
    description: "Slaps a user",
    execute: async(message) => {
        let member = message.message.mentions.members.first();
        if (!member) {
        return message.message.channel.send("You need a mention a user")
        }
        await message.message.channel.send({embed: {
            color: (colors.heptagram),
            title: message.message.author.username + " slapped :raised_back_of_hand: " + member.displayName + ", " + member.displayName + " is now in the hospital! :hospital:"
        }});
    }
}