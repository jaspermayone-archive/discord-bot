const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, emoji) => {
	try {
		const auditLogs = await emoji.guild.fetchAuditLogs({
			type: "EMOJI_DELETE",
		});
		const log = auditLogs.entries.first();
		const data = { log, emoji };
		dbLogging(data, emoji.guild.name);
	} catch (err) {
		console.error(err);
	}
};