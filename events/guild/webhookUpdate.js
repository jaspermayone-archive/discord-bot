const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, channel) => {
	try {
		const auditLogs = await channel.guild.fetchAuditLogs({
			limit: 1,
			type: "WEBHOOK_UPDATE",
		});
		const log = auditLogs.entries.first();
		const data = { channel, log };
		dbLogging(data, channel.guild.name);
	} catch (err) {
		console.error(err);
	}
};
