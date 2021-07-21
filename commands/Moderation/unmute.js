module.exports = {
	name: 'unmute',
	guildOnly: true,
	description: 'unmutes user',
	category: 'Moderation',
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: "<@user you want to unmute>",
	permissions: ["MUTE_MEMBERS"],

	execute({ message, roles }) {

		if (!message.member.hasPermission('MOVE_MEMBERS')) {
			const target = message.mentions.users.first();

			const mainRole = message.guild.roles.cache.get(roles.users);
			const muteRole = message.guild.roles.cache.get(roles.muted);

			const memberTarget = message.guild.members.cache.get(target.id);

			memberTarget.roles.remove(muteRole.id);
			memberTarget.roles.add(mainRole.id);
			message.channel.send(`<@${memberTarget.user.id}> has been unmuted`);
		}
		else {
			message.reply(replies.restricted);
		}
	},
};