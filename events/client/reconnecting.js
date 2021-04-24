const dbLogging = require("../dbLogging");

module.exports = (Discord, client) => {
	client.logger.log("Bot reconnecting...");

	const data = { action: "RECONNECTING" };
	dbLogging(data);
};
