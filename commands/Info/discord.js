module.exports = {
	name: 'discord',
	description: 'sends a link for the bot support server',
	category: 'Info',
	minArgs: 0,
	maxArgs: 0,
	expectedArgs: "",

	execute: ({ message }) => {
		message.channel.send({ content: 'Join the Heptagram bot discord server at https://discord.gg/HSupF99kpq' });
	},
};