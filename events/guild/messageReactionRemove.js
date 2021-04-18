const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, messageReaction, user) => {
	try {
		const auditLogs = await messageReaction.message.guild.fetchAuditLogs({
			limit: 1,
			type: "MESSAGE_REACTION_REMOVE",
		});
		const log = auditLogs.entries.first();
		await dbLogging(log, {
			...messageReaction,
			user,
			action: "MESSAGE_REACTION_REMOVE",
		});
	} catch (err) {
		console.error(err);
	}
};
