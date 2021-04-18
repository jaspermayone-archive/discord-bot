module.exports = {
    name: 'server',
    guildOnly: true,
    description: "sends a link for the bot support server",
    execute({ message, roles }) {
        message.channel.send('Join the Heptagram bot discord server at https://discord.gg/HSupF99kpq');
    }
}