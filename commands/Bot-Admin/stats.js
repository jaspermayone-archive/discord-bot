//This command is bot owner only.

module.exports = {
    name: 'stats',
    description: "Stats command is Bot Owner Only.",
    execute({ message, args, roles }) {
        if (message.member.roles.cache.has(roles.botadmin)) {
            const promises = [
                client.shard.fetchClientValues('guilds.cache.size'),
                client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)'),
            ];

            Promise.all(promises)
                .then(results => {
                    const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
                    const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
                    return message.channel.send(`Server count: ${totalGuilds}\nMember count: ${totalMembers}`);
                })
                .catch(console.error);
        } else {
            message.channel.send('This is a Heptagram Admin command. Think this is a mistake? Ask about it in our support server.');
        }
    }
}