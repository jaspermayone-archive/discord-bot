module.exports = (client, guild) => {
  if (!guild.available) return;

  client.logger.cmd(`[GUILD LEAVE] ${guild.id} removed the bot.`);

  if (client.settings.has(guild.id)) {
    client.settings.delete(guild.id);
  }
};
