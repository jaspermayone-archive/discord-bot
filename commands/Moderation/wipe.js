module.exports = {
	name: 'wipe',
	description: 'clear with bigger options',
	category: 'Moderation',
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: "<number of messgaes you want to clear>",
	permissions: ["MANAGE_MESSAGES"],

	async execute({ message, args }) {
		if (message.member.permissions.has('MANAGE_MESSAGES')) {
			if (isNaN(args[0])) return message.reply('Please enter a number instead of text.');

			if (args[0] > 100) return message.reply('Slow down! This command resticts to 100 messages per command for safety.');
			if (args[0] < 11) return message.reply('You must delete at least 11 messages. Please use clear for smaller jobs.');

			await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
				message.channel.bulkDelete(messages);
			});

		}
		else {
			message.channel.send('Sorry, this command is resticted!');
		}
	},
};