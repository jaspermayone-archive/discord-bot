const { replies } = require('../../config.json');

module.exports = {
	name: 'unmute',
	description: 'unmutes user',
	guildOnly: true,
	category: 'moderation',

	execute({ message, roles }) {

		if (message.member.roles.cache.has(roles.admin)) {

			const target = message.mentions.users.first();
			if (target) {
				const mainRole = message.guild.roles.cache.get(roles.users);
				const muteRole = message.guild.roles.cache.get(roles.muted);

				const memberTarget = message.guild.members.cache.get(target.id);

				memberTarget.roles.remove(muteRole.id);
				memberTarget.roles.add(mainRole.id);
				message.channel.send(`<@${memberTarget.user.id}> has been unmuted`);
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