module.exports = {
    name: 'uptime',
    description: "gets server uptime",
    guildOnly: true,
    category: "Utilitys",

    execute({ message, args, discord, client, roles }) {
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;
  
        message.channel.send(`Bot Uptime: \`${days}d ${hours}h ${minutes}m ${seconds}s\``);
    }
}