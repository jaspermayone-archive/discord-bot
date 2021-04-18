const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, member) => {
	try {
		const auditLogs = await member.guild.fetchAuditLogs({
			type: "GUILD_MEMBER_REMOVE",
		});
		const log = auditLogs.entries.first();
		await dbLogging(log, { member });
	} catch (err) {
		console.error(err);
	}
};
