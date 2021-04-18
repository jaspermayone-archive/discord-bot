const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, oldEmoji, newEmoji) => {
	try {
		const auditLogs = await newEmoji.guild.fetchAuditLogs({
			type: "EMOJI_UPDATE",
		});
		const log = auditLogs.entries.first();
		await dbLogging(log, { oldEmoji, newEmoji });
	} catch (err) {
		console.error(err);
	}
};
