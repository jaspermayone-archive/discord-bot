const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, role) => {
	try {
		const auditLogs = await role.guild.fetchAuditLogs({
			limit: 1,
			type: "ROLE_DELETE",
		});
		const log = auditLogs.entries.first();
		await dbLogging(log, { role });
	} catch (err) {
		console.error(err);
	}
};
