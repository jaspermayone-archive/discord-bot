const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, members, guild, chunk) => {
	try {
		const auditLogs = await guild.fetchAuditLogs({
			type: "GUILD_MEMBERS_CHUNK",
		});
		const log = auditLogs.entries.first();
		await dbLogging(log, { members, guild, chunk });
	} catch (err) {
		console.error(err);
	}
};
