const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, reaction) => {
	try {
		const auditLogs = await reaction.message.guild.fetchAuditLogs({
			limit: 1,
			type: "MESSAGE_REACTION_REMOVE_EMOJI",
		});
		const log = auditLogs.entries.first();
		await dbLogging(log, {
			reaction,
			action: "MESSAGE_REACTION_REMOVE_EMOJI",
			actionType: "REACTION_REMOVE_EMOJI",
		});
	} catch (err) {
		console.error(err);
	}
};
