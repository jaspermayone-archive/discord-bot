
const { prefix, token, roles, MongoDB, serverId, Discord, colors } = require('../../config.json');
const { MessageEmbed } = require("discord.js");
const commandCooldowns = require('../../command-cooldowns');

module.exports = {
    name: 'mask',
    guildOnly: false,
    description: "tells chat to put their mask on",
    category: "COVID",
    cooldown: 5,

    execute({ message, Discord, client, args }) {
        if (commandCooldowns({ name: this.name, cooldown: this.cooldown, message, Discord, client })) return;

        const embed = new Discord.MessageEmbed()
            .setTitle("COVID Police: 🚨")
            .setColor(colors.heptagram)
            //const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');
            .setDescription('Put your mask back on!')
        message.channel.send(embed);
    }
}