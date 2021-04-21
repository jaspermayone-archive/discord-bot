module.exports = {
    name: 'botinfo',
    description: "Displays info about bot.",
    guildOnly: true,
    category: "Info",

    execute({ discord, client, message, roles }) {
        message.channel.send('This is the Heptagram discord bot. Heptagam has a variety of info commands.');
        message.channel.send(`Run \`!serverinfo\` for server statistics, \`!userinfo\` for info about a user, and \`!botinfo\` for info about this bot. `)
    }
}