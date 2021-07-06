const { roles, replies } = require('../../config.json');

module.exports = {
	name: 'ban',
	description: 'bans users',
	guildOnly: true,
	category: 'moderation',

	execute({ message }) {
		const member = message.mentions.users.first();

		if (message.member.roles.cache.has(roles.admin)) {
			if (member) {
				const memberTarget = message.guild.members.cache.get(member.id);
				memberTarget.ban();
				message.reply('The user has been banned.');
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