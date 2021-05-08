const Discord = require('discord.js')

const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');


module.exports = {
    name: "play",
    category: "music",
    description: "plays a song",
    guildOnly: true,

    execute({ message, client, args, roles }) {
        client.player.play(message, args[0]);
    }
};