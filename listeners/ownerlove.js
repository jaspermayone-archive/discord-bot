const { IDs, emoji } = require('../config.json');

module.exports = (client) => {

	client.on('message', async message => {
		if (message.author.id == (IDs.OwnerID)) {
			const reactionEmoji = client.emojis.cache.get(emoji.HeptaHeart);
			message.react(reactionEmoji);
		}
		else {}
	});
};