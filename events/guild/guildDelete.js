const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, guild) => {
	try {
		const auditLogs = await guild.fetchAuditLogs({
			type: "GUILD_DELETE",
		});
		const log = auditLogs.entries.first();
		await dbLogging(log, { guild });
	} catch (err) {
		console.error(err);
	}
};
