const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, member, speaking) => {
	try {
		const auditLogs = await member.guild.fetchAuditLogs({
			type: "GUILD_MEMBER_SPEAKING",
		});
		const log = auditLogs.entries.first();
		const data = { log, member, speaking };
		dbLogging(data, member.guild.name);
	} catch (err) {
		console.error(err);
	}
};
