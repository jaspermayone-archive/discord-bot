module.exports = {
	name: 'api',
	aliases: ['API'],
	description: 'gives info about the Heptagram API',
	category: 'Info',
	minArgs: 0,
	maxArgs: 0,
	expectedArgs: "",

	execute: ({ message }) => {
		message.channel.send({ content: 'The Heptagram team is curently working on developing an API. Stay tuned for more info.' });
	},
};