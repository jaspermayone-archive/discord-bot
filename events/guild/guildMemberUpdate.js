const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, oldMember, newMember) => {
	try {
		const auditLogs = await newMember.guild.fetchAuditLogs({
			type: "GUILD_MEMBER_UPDATE",
		});
		const log = auditLogs.entries.first();
		await dbLogging(log, { oldMember, newMember });
	} catch (err) {
		console.error(err);
	}
};
