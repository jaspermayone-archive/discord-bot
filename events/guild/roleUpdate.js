const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, oldRole, newRole) => {
	try {
		const auditLogs = await newRole.guild.fetchAuditLogs({
			limit: 1,
			type: "ROLE_UPDATE",
		});
		const log = auditLogs.entries.first();
		await dbLogging(log, { oldRole, newRole });
	} catch (err) {
		console.error(err);
	}
};
