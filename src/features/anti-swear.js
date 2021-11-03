const filter = require('leo-profanity');

module.exports = async function (message) {
  if (message.guild == null) return;
  if (message.deleted) return;
  if (filter.check(message.content)) {
    message.delete();
    const warning = await message.channel.send(
      `${message.author}, do not use bad words in chat!`,
    );
    setTimeout(warning.delete, 4500);
  }
};

module.exports.config = {
  displayName: 'Anti Sewar',
  dbName: 'ANTI SWEAR',
};
