
const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');

module.exports = {
    name: 'botinfo',
    description: "Displays info about bot.",
    guildOnly: true,
    category: "Bot Info",

    execute({ Discord, client, message, roles }) {
        let ping = message.createdTimestamp - message.createdTimestamp;

        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        message.channel.send('This is the Heptagram discord bot. Heptagram is the open-source multipurpose discord bot with the goal to be the single needed bot for any server.');

        message.channel.send(`**You can find out more about Heptagram in our support server or on our GitHub Repository.**`);
        message.channel.send(`Run \`${prefix}repo\` for our repo, or \`${prefix}server\` for a link to our support server. `),


        message.channel.send(`**Heptagram will now display a variety of statistics.**`);

        message.channel.send(`*Here is Heptagram's ping and uptime:*`);
        message.channel.send(`Bot Latency: \`${ping}ms\`, API Latency: \`${Math.round(message.client.ws.ping)}ms\` Websocket Heartbeat: \`${client.ws.ping}ms.\``);
        message.channel.send(`Bot Uptime: \`${days}d ${hours}h ${minutes}m ${seconds}s\``);

        message.channel.send(`**Here is are some statistics unique to this server:**`);
        message.channel.send(`*Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}*`);
    }
}