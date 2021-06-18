const { emoji } = require('../../config.json');

module.exports = {
	name: 'reaction',
	description: 'react testing',
	guildOnly: true,
	category: 'Examples',

	execute({ message, client }) {
		const reactionEmoji = client.emojis.cache.get(emoji.HeptaHeart);
		message.react(reactionEmoji);
		message.react('😄');

	},
};