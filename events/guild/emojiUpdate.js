const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, oldEmoji, newEmoji) => {
	try {
		const auditLogs = await newEmoji.guild.fetchAuditLogs({
			type: "EMOJI_UPDATE",
		});
		const log = auditLogs.entries.first();
		const data = { log, oldEmoji, newEmoji };
		dbLogging(data, newEmoji.guild.name);
	} catch (err) {
		console.error(err);
	}
};
