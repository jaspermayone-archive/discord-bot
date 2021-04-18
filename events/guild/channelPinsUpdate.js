const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, channel, time) => {
	try {
		const auditLogs = await channel.guild.fetchAuditLogs({
			type: "CHANNEL_PINS_UPDATE",
		});
		const log = auditLogs.entries.first();
		await dbLogging(log, { channel, time });
	} catch (err) {
		console.error(err);
	}
};