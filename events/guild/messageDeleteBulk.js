const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, messages) => {
	try {
		const auditLogs = await messages.guild.fetchAuditLogs({
			limit: 1,
			type: "MESSAGE_BULK_DELETE"
		});
		const log = auditLogs.entries.first();
		await dbLogging(log, {
			messages,
			action: "MESSAGE_BULK_DELETE",
			actionType: "BULK_DELETE",
		});
	} catch (err) {
		console.error(err);
	}
};
