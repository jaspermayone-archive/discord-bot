const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, guild) => {
	try {
		const auditLogs = await guild.fetchAuditLogs({
			type: "GUILD_UNAVAILABLE",
		});
		const log = auditLogs.entries.first();
		const data = { log, guild };
		dbLogging(data, guild.name);
	} catch (err) {
		console.error(err);
	}
};
