const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'setprefix',
    description: "Set prefix of the guild",
    execute({ message, roles, args, client }) {
      if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("You do not have permission to use this command")
    if (args[0].length > 3) return message.channel.send("A prefix can only be 3 or less characters")
    if (args[0] === db.get(`guild_${message.guild.id}_prefix`)) return message.channel.send("That is already your prefix")
    if (args[0] === client.prefix) db.delete(`guild_${message.guild.id}_prefix`)
    db.set(`guild_${message.guild.id}_prefix`, args[0])
    return message.channel.send(`I have now set your prefix to \`${args[0]}\``)
    }
}
