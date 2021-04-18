const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, messageReaction, user) => {
	// 
	try {
		const auditLogs = await messageReaction.message.guild.fetchAuditLogs({
			limit: 1,
			type: "MESSAGE_REACTION_ADD",
		});
		const log = auditLogs.entries.first();
		await dbLogging(log, {
			...messageReaction,
			user,
			action: "MESSAGE_REACTION_ADD",
			actionType: "REACTION_ADD",
		});
	} catch (err) {
		console.error(err);
	}
};
