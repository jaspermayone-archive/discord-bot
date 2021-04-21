const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, channel) => {
	try {
		const auditLogs = await channel.guild.fetchAuditLogs({
			type: "CHANNEL_UPDATE",
		});
		const log = auditLogs.entries.first();
		await dbLogging(log, { channel });
	} catch (err) {
		console.error(err);
	}
};
