module.exports = {
    name: 'clear',
    description: "clears messages",
    async execute(message, args, Discord){
        if(message.member.roles.cache.has('825176015562997781')){
            if(!args[0]) return message.reply("Please specify a number of messages to clear.")
            if(isNaN(args[0])) return message.reply("Please enter a number instead of text.")
        
            if(args[0] > 50) return message.reply("Slow down! This command resticts to 50 messages per command for safety.")
            if(args[0] < 2) return message.reply("You must delete at least 1 message.")
        
                await message.channel.messages.fetch({limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages);
                });
        
        } else {
            message.channel.send('Sorry, this command is resticted!');
           }
        }
}