const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, channel) => {
	try {
		const auditLogs = await channel.guild.fetchAuditLogs({
			limit: 1,
			type: "WEBHOOK_UPDATE",
		});
		const log = auditLogs.entries.first();
		await dbLogging(log, { channel });
	} catch (err) {
		console.error(err);
	}
};
