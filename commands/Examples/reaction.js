const { IDs, emoji } = require('../../config.json');

module.exports = {
	name: 'reaction',
	aliases: ['react'],
	description: 'react testing',
	category: 'Examples',
	minArgs: 0,
	maxArgs: 0,
	expectedArgs: "",
	ownerOnly: true,
	hidden: true,
	testOnly: true,

	execute({ message, client }) {
		message.react('😄');
		if (message.author.id == (IDs.OwnerID)) {
			const reactionEmoji = client.emojis.cache.get(emoji.HeptaHeart);
			message.react(reactionEmoji);
		}
		else {}
	},
};