module.exports = {
	name: 'admin',
	description: 'admin example',
	category: 'Examples',
	minArgs: 0,
	maxArgs: 0,
	expectedArgs: "",
	ownerOnly: true,
	hidden: true,
	testOnly: true,

	execute({ message, roles }) {
		if (message.member.roles.cache.has(roles.admin)) {
			message.channel.send({ content: 'This is an admin command example' });
		}
		else {
			message.channel.send({ content: 'Sorry, this is a restricted command example!' });
		}
	},
};