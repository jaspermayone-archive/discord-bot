module.exports = {
    name: 'support',
    guildOnly: true,
    description: "sends a link for the bot support server",
    execute({ message, roles }) {
        if (message.member.roles.cache.has(roles.admin)) {
            message.channel.send('Need help with Heptigram? Join our discord server at https://discord.gg/HSupF99kpq');
        } else {
            message.channel.send('Need help with Heptigram? Have someone with Admin permissions run this command');
        }
    }
}