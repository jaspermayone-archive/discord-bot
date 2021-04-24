const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, channel) => {
	try {
		const auditLogs = await channel.guild.fetchAuditLogs({
			type: "CHANNEL_CREATE",
		});
		const log = auditLogs.entries.first();
		const data = { log, channel };
		dbLogging(data, channel.guild.name );
	} catch (err) {
		console.error(err);
	}
};
