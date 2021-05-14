const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');

module.exports = {
    name: "announce",
    description: "Make an Announcemnet in your Server",
   // execute: async (client, message, args) => {
        execute ({ message, client, roles, Discord, args }) {

        const anchannel = message.mentions.channels.first();
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send("You don't have enogh Permissions")
        }
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send("I don't have enough Permissions")
        }
        if (!anchannel) {
        return message.channel.send(`Usage: ${prefix} <channel> <msg>`)
        }
        if (!args.slice(1).join(" ")) {
        return message.channel.send("Please add some text to make an Announcement")
        }

        let embed = new Discord.MessageEmbed()
        .setTitle(`< New Server Announcement`)
        .setDescription(args.slice(1).join(" "), { allowedMentions: { parse:["users"] } })
        .setColor(colors.heptagram)
        .setFooter(`Announcement by ${message.author.username}`);
        anchannel.send(embed);
    
        let anembed = new Discord.MessageEmbed()
        .setTitle("Done!")
        .setDescription (`Announcement has been sent to ${anchannel}`)
        .setColor(colors.heptagram);

        message.channel.send(anembed);
        message.delete();
    }
}
