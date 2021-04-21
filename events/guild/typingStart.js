const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, channel, user) => {
	try {
		const auditLogs = await user.presence.guild.fetchAuditLogs({
			limit: 1,
			type: "TYPING_START",
		});
		const log = auditLogs.entries.first();
		await dbLogging(log, { channel, user });
	} catch (err) {
		console.error(err);
	}
};
