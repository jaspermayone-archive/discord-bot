const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, role) => {
	try {
		const auditLogs = await role.guild.fetchAuditLogs({
			limit: 1,
			type: "ROLE_CREATE",
		});
		const log = auditLogs.entries.first();
		const data = { role, log };
		dbLogging(data, role.guild.name);
	} catch (err) {
		console.error(err);
	}
};
