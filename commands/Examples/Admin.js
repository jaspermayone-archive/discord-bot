module.exports = {
	name: 'admin',
	description: 'admin example',
	category: 'Examples',
	ownerOnly: true,

	execute({ message, roles }) {
		if (message.member.roles.cache.has(roles.admin)) {
			message.channel.send('This is an admin command example');
		}
		else {
			message.channel.send('Sorry, this is a restricted command example!');
		}
	},
};