module.exports = {
	name: 'link',
	aliases: ['lnk'],
	description: 'link testing',
	category: 'Examples',
	minArgs: 0,
	maxArgs: 0,
	expectedArgs: "",
	ownerOnly: true,
	hidden: true,
	testOnly: true,

	execute({ message }) {
		message.channel.send("https://google.com");
	},
};