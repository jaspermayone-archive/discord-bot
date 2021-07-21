module.exports = {
	name: 'reaction',
	aliases: ['react'],
	description: 'react testing',
	category: 'Examples',
	minArgs: 0,
	maxArgs: 0,
	expectedArgs: "",
	ownerOnly: true,
	hidden: true,
	testOnly: true,

	execute({ message }) {
		message.react('😄');

	},
};