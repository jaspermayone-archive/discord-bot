const { colors, replies } = require('../../config.json');

module.exports = {
	name: 'slap',
	description: 'Slaps a user',
	category: 'Fun',

	execute: async (message) => {
		const member = message.message.mentions.members.first();
		if (!member) {
			return message.message.channel.send(replies.mention);
		}
		await message.message.channel.send({ embed: {
			color: (colors.heptagram),
			title: message.message.author.username + ' slapped :raised_back_of_hand: ' + member.displayName + ', ' + member.displayName + ' is now in the hospital! :hospital:',
			timestamp:new Date(),
		} });
	},
};