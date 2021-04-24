const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, member) => {
	try {
		const auditLogs = await member.guild.fetchAuditLogs({
			type: "GUILD_MEMBER_AVAILABLE",
		});
		const log = auditLogs.entries.first();
		const data = { log, member };
		dbLogging(data, member.guild.name);
	} catch (err) {
		console.error(err);
	}
};
