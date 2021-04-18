const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, guild, user) => {
	try {
		const auditLogs = await guild.fetchAuditLogs({
			type: "GUILD_BAN_ADD",
		});
		const log = auditLogs.entries.first();
		await dbLogging(log, { guild, user });
	} catch (err) {
		console.error(err);
	}
};
