const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, channel, time) => {
	try {
		const auditLogs = await channel.guild.fetchAuditLogs({
			type: "CHANNEL_PINS_UPDATE",
		});
		const log = auditLogs.entries.first();
		const data = { log, channel, time };
		dbLogging(data, channel.guild.name);
	} catch (err) {
		console.error(err);
	}
};