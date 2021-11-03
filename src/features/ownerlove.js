const { IDs, emoji } = require('../config.json');

module.exports = (client) => {
  client.on('messageCreate', async (message) => {
    if (message.author.id == IDs.OwnerID) {
      const reactionEmoji = client.emojis.cache.get(emoji.HeptaHeart);
      await message.react(reactionEmoji);
    } else {
    }
  });
};

module.exports.config = {
  displayName: 'Owner Love',
  dbName: 'OWNER LOVE',
};
