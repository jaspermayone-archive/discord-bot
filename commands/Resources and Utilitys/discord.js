module.exports = {
	name: 'discord',
	description: 'sends a link for the bot support server',
	category: 'Resources',

	execute: ({ message }) => {
		message.channel.send('Join the Heptagram bot discord server at https://discord.gg/HSupF99kpq');
	},
};