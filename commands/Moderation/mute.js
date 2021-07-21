const ms = require('ms');
module.exports = {
	name: 'mute',
	guildOnly: true,
	description: 'mutes user',
	category: 'Moderation',
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: "<@user you want to mute>",
	permissions: ["MUTE_MEMBERS"],

	execute({ message, args, roles }) {

		const target = message.mentions.users.first();

		const mainRole = message.guild.roles.cache.get(roles.users);
		const muteRole = message.guild.roles.cache.get(roles.muted);

		const memberTarget = message.guild.members.cache.get(target.id);

		if (!args[1]) {
			memberTarget.roles.remove(mainRole.id);
			memberTarget.roles.add(muteRole.id);
			message.channel.send(`<@${memberTarget.user.id}> has been muted`);
			return;
		}
		memberTarget.roles.remove(mainRole.id);
		memberTarget.roles.add(muteRole.id);
		message.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}`);

		setTimeout(function() {
			memberTarget.roles.remove(muteRole.id);
			memberTarget.roles.add(mainRole.id);
		}, ms(args[1]));
	},
};