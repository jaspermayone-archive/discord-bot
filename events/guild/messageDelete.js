const dbLogging = require('../dbLogging');

module.exports = async (Discord, client, message) => {
	try {
		const auditLogs = await message.guild.fetchAuditLogs({
			limit: 1,
			type: "MESSAGE_DELETE",
		});
		const log = auditLogs.entries.first();
		await dbLogging(log, {
			message,
			action: "MESSAGE_DELETE",
			actionType: "DELETE",
		});
	} catch (err) {
		console.error(err);
	}
};
