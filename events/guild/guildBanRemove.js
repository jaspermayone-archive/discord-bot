const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, guild, user) => {
	try {
		const auditLogs = await guild.fetchAuditLogs({
			type: "GUILD_BAN_REMOVE",
		});
		const log = auditLogs.entries.first();
		const data = { log, guild, user };
		dbLogging(data, guild.name);
	} catch (err) {
		console.error(err);
	}
};
