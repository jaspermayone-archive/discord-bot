const { IDs, replies } = require('../../config.json');

module.exports = {
	name: 'join',
	description: 'pretends a new user has joined (for testing only)',
	guildOnly: true,
	OwnerOnly: true,

	execute({ client, message }) {
		if (message.author.id === (IDs.OwnerID)) {
			client.emit('guildMemberAdd', message.member);
		}
		else {
			message.channel.send(replies.restricted);
		}
	},
};
