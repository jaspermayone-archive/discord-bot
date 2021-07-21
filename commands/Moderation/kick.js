const { replies } = require('../../config.json');

module.exports = {
	name: 'kick',
	guildOnly: true,
	description: 'kicks users',
	category: 'Moderation',
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: "<@member you want to kick>",

	execute({ message }) {
		const member = message.mentions.users.first();

		if ((message.member.hasPermission('MANAGE_SERVER', 'MANAGE_CHANNELS'))) {
			const memberTarget = message.guild.members.cache.get(member.id);
			memberTarget.kick();
			message.reply('The user has been kicked.');

		}
		else {
			message.channel.send(replies.restricted);
		}

	},
};