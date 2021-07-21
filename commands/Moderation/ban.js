module.exports = {
	name: 'ban',
	description: 'bans users',
	guildOnly: true,
	category: 'Moderation',
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: "<@user you want to ban>",

	execute({ message }) {
		const member = message.mentions.users.first();

		if ((message.member.hasPermission('MANAGE_SERVER', 'MANAGE_CHANNELS'))) {

			const memberTarget = message.guild.members.cache.get(member.id);
			memberTarget.ban();
			message.reply('The user has been banned.');
		}
		else {
			message.channel.send('Sorry, this command is resticted!');
		}

	},
};