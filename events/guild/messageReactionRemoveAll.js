const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, message) => {
	try {
		const auditLogs = await message.guild.fetchAuditLogs({
			limit: 1,
			type: "MESSAGE_REACTION_REMOVE_ALL",
		});
		const log = auditLogs.entries.first();
		await dbLogging(log, {
			message,
			action: "MESSAGE_REACTION_REMOVE_ALL",
			actionType: "REACTION_REMOVE_ALL",
		});
	} catch (err) {
		console.error(err);
	}
};
