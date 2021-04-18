const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, oldState, newState) => {
	try {
		const auditLogs = await newState.guild.fetchAuditLogs({
			limit: 1,
			type: "VOICE_STATE_UPDATE",
		});
		const log = auditLogs.entries.first();
		await dbLogging(log, { oldState, newState });
	} catch (err) {
		console.error(err);
	}
};
