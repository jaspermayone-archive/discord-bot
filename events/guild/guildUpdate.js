const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, oldGuild, newGuild) => {
	try {
		const auditLogs = await newGuild.fetchAuditLogs({ 
			type: "GUILD_UPDATE" 
		});
		const log = auditLogs.entries.first();
		const data = { log, oldGuild, newGuild };
		dbLogging(data, newGuild.name);
	} catch (err) {
		console.error(err);
	}
};
