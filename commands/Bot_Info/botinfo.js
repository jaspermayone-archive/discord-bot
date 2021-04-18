module.exports = {
    name: 'botinfo',
    description: "Displays info about bot.",
    guildOnly: true,
    execute({ discord, client, message, roles }) {
        let ping = message.createdTimestamp - message.createdTimestamp;
        message.channel.send('This is the Heptagram discord bot. Heptagram is the open-source multipurpose discord bot with the goal to be the single needed bot for any server.');
        
        message.channel.send(`**You can find out more about Heptagram in our support server or on our GitHub Repository.**`);
        message.channel.send(`Run \`!repo\` for our repo, or \`!server\` for a link to our support server. `),

        
        message.channel.send(`**Heptagram will now display a variety of statistics.**`);
       
        message.channel.send(`*Here is Heptagram's ping stats:*`);
        message.channel.send(`Bot Latency: \`${ping}ms\`, API Latency: \`${Math.round(message.client.ws.ping)}ms\` Websocket Heartbeat: \`${client.ws.ping}ms.\``);
        
        message.channel.send(`**Here is are some statistics unique to this server:**`);
        message.channel.send(`*Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}*`);
    }
}