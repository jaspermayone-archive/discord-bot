const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, oldRole, newRole) => {
	try {
		const auditLogs = await newRole.guild.fetchAuditLogs({
			limit: 1,
			type: "ROLE_UPDATE",
		});
		const log = auditLogs.entries.first();
		const data = { oldRole, newRole, log };
		dbLogging(data, newRole.guild.name);
	} catch (err) {
		console.error(err);
	}
};
