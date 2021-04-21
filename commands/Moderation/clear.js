module.exports = {
    name: 'clear',
    description: "clears messages",
    guildOnly: true,
    category: "moderation",

    async execute({ message, args, roles }) {
        if (message.member.roles.cache.has(roles.admin)) {
            if (!args[0]) return message.reply("Please specify a number of messages to clear.")
            if (isNaN(args[0])) return message.reply("Please enter a number instead of text.")

            if (args[0] > 10) return message.reply("Slow down! This command resticts to 10 messages per command for safety.")
            if (args[0] < 2) return message.reply("You must delete at least 2 messages.")

            await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
                message.channel.bulkDelete(messages);
            });

        } else {
            message.channel.send('Sorry, this command is resticted!');
        }
    }
}