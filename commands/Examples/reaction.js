const { emoji } = require('../../config.json');

module.exports = {
	name: 'reaction',
	description: 'react testing',
	category: 'Examples',
	ownerOnly: true,
	hidden: true,
	testOnly: true,

	execute({ message, client }) {
		const reactionEmoji = client.emojis.cache.get(emoji.HeptaHeart);
		message.react(reactionEmoji);
		message.react('😄');

	},
};