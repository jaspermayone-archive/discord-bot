// Call this function if a command needs a cooldown period

module.exports = ({ name, cooldown, message, Discord, client }) => {
  const { cooldowns } = client;

  if (!cooldowns.has(name)) {
    cooldowns.set(name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(name);
  const cooldownAmount = (cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(
          1,
        )} more second(s) before reusing the \`${name}\` command.`,
      );
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
};
