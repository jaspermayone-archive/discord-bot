const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, oldMember, newMember) => {
	try {
		const auditLogs = await newMember.guild.fetchAuditLogs({
			type: "GUILD_MEMBER_UPDATE",
		});
		const log = auditLogs.entries.first();
		const data = { log, oldMember, newMember };
		dbLogging(data, newMember.guild.name);
	} catch (err) {
		console.error(err);
	}
};
