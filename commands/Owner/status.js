module.exports = {
	name: 'status',
	description: 'changes bot status',
	category: 'Owner',
	ownerOnly: true,

	execute({ client, message, prefix }) {
		const content = message.content.replace(`${prefix}status`, '');

		client.user.setPresence({
			activity: {
				name: content,
				type: 3,
			},
		});
	},
};
