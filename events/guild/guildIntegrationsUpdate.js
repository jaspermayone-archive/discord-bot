const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, guild) => {
	try {
		const auditLogs = await guild.fetchAuditLogs({
			type: "GUILD_INTEGRATIONS_UPDATE",
		});
		const log = auditLogs.entries.first();
		await dbLogging(log, { guild });
	} catch (err) {
		console.error(err);
	}
};
