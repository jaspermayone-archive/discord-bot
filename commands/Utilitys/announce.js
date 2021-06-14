const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');

module.exports = {
    name: "announce",
    description: "Make an Announcemnet in your Server",
    guildOnly: true,

    execute ({ message, client, roles, Discord, args }) {

        const anchannel = message.mentions.channels.first();
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send("You don't have enogh Permissions")
        }
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send("I don't have enough Permissions")
        }
        if (!anchannel) {
        message.channel.send("Please specify a channnel and message to make an Announcement.")
        message.channel.send(`Command Usage: \`${prefix} <channel> <msg>\``)

        }
        if (!args.slice(1).join(" ")) {
        return message.channel.send("")
        }

        let embed = new Discord.MessageEmbed()
        .setTitle(`**Announcement!**`)
        .setDescription(args.slice(1).join(" "), { allowedMentions: { parse:["users"] } })
        .setColor(colors.heptagram)
        .setFooter(`Announcement by ${message.author.username}`);
        anchannel.send(embed);
    
        let anembed = new Discord.MessageEmbed()
        .setTitle("Done!")
        .setDescription (`Announcement has been sent to ${anchannel}`)
        .setColor(colors.heptagram);

        message.channel.send(anembed);
    }
}
