//This command is bot owner only.

module.exports = {
    name: 'idle',
    description: "sets bot to idle.",    
    execute({ message, args, roles }) {

        if (message.member.roles.cache.has(roles.botadmin)) {
            bot.user.setStatus("idle").then(console.log).catch(console.error);
        } else {
            message.channel.send('This is a Heptagram Admin command. Think this is a mistake? Ask about it in our support server.');
        }
    }
}