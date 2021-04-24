module.exports = (Discord, client) => {
	client.logger.warn("Bot is disconnecting...");

	const data = { action: "DISCONNECTING" };
	dbLogging(data);
};
