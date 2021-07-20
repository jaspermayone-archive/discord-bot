const { replies } = require('../../config.json');

module.exports = {
	name: 'kick',
	guildOnly: true,
	description: 'kicks users',
	category: 'Moderation',

	execute({ message }) {
		const member = message.mentions.users.first();

		if ((message.member.hasPermission('MANAGE_SERVER', 'MANAGE_CHANNELS'))) {
			if (member) {
				const memberTarget = message.guild.members.cache.get(member.id);
				memberTarget.kick();
				message.reply('The user has been kicked.');
			}
			else {
				message.reply(replies.mention);
			}
		}
		else {
			message.channel.send('Sorry, this command is resticted!');
		}

	},
};