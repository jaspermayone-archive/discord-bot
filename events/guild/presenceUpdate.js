const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, oldPresence, newPresence) => {
	try {
		const auditLogs = await newPresence.guild.fetchAuditLogs({
			limit: 1,
			type: "PRESENCE_UPDATE",
		});
		const log = auditLogs.entries.first();
		const data = { oldPresence, newPresence, log };
		dbLogging(data, newPresence.guild.name);
	} catch (err) {
		console.error(err);
	}
};
