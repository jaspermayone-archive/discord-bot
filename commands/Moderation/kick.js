module.exports = {
	name: 'kick',
	guildOnly: true,
	description: 'kicks users',
	category: 'Moderation',
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: "<@member you want to kick>",
	permissions: ["KICK_MEMBERS"],

	execute({ message }) {
		const member = message.mentions.users.first();
		const memberTarget = message.guild.members.cache.get(member.id);

		memberTarget.kick();
		message.reply('The user has been kicked.');

	},
};