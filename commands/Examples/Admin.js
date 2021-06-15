module.exports = {
	name: 'admin',
	description: 'admin example',
	guildOnly: true,
	category: 'Examples',

	execute({ message, roles }) {
		if (message.member.roles.cache.has(roles.admin)) {
			message.channel.send('This is an admin command example');
			// The resricted reponse message goes in here.
		}
		else {
			message.channel.send('Sorry, this command is resticted!');
		}
	},
};