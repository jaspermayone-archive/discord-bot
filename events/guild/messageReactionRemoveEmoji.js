const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, reaction) => {
	try {
		const guild = reaction.message.guild;
		const auditLogs = await guild.fetchAuditLogs({
			limit: 1,
			type: "MESSAGE_REACTION_REMOVE_EMOJI",
		});
		const log = auditLogs.entries.first();
		const data = {
			action: "MESSAGE_REACTION_REMOVE_EMOJI",
			actionType: "REACTION_REMOVE_EMOJI",
			channel: message.channel.name,
			reaction,
			...log,
		};
		dbLogging(data, guild.name);
	} catch (err) {
		console.error(err);
	}
};
