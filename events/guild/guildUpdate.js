const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, oldGuild, newGuild) => {
	try {
		const auditLogs = await newGuild.fetchAuditLogs({ 
			type: "GUILD_UPDATE" 
		});
		const log = auditLogs.entries.first();
		await dbLogging(log, { oldGuild, newGuild });
	} catch (err) {
		console.error(err);
	}
};
