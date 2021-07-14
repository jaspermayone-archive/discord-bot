const { IDs, prefix } = require('../../config.json');

module.exports = {
	name: 'statuschange',
	description: 'changes bot status',
	guildOnly: false,

	execute({ client, message }) {
		if (message.author.id === (IDs.OwnerID)) {
			const content = message.content.replace(`${prefix}statuschange`, '');

			client.user.setPresence({
				activity: {
					name: content,
					type: 3,
				},
			});
		}
		else {
			message.channel.send('Sorry, this command is resticted!');
		}
	},
};
