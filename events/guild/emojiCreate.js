const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, emoji) => {
	try {
		const auditLogs = await emoji.guild.fetchAuditLogs({
			type: "EMOJI_CREATE",
		});
		const log = auditLogs.entries.first();
		await dbLogging(log, { emoji });
	} catch (err) {
		console.error(err);
	}
};
