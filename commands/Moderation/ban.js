module.exports = {
	name: 'ban',
	description: 'bans users',
	guildOnly: true,
	category: 'Moderation',
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: "<@user you want to ban>",
	permissions: ["BAN_MEMBERS"],

	execute({ message }) {
		const member = message.mentions.users.first();
		const memberTarget = message.guild.members.cache.get(member.id);

		memberTarget.ban();
		message.reply({ content: 'The user has been banned.' });
	},
};