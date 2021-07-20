module.exports = {
	name: 'join',
	description: 'pretends a new user has joined (for testing only)',
	category: 'Owner',
	ownerOnly: true,
	hidden: true,

	execute({ client, message }) {
		client.emit('guildMemberAdd', message.member);
		message.channel.send('Join emmited!');
	},
};
