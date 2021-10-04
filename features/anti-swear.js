const filter = require('leo-profanity');
const Permissions = require('discord.js').Permissions;

module.exports = async function (message) {
  if (message.channel.type === 'DM') return;
  if (message.deleted) return;
  if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
    // Should be made configurable soon
    if (filter.check(message.content)) {
      message.delete();
      const warning = await message.channel.send(
        `${message.author}, do not use bad words in chat!`,
      );
      setTimeout(warning.delete, 4500);
    }
  }
};
