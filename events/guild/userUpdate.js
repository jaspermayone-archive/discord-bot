const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, oldUser, newUser) => {
	try {
		const auditLogs = await newUser.presence.guild.fetchAuditLogs({
			limit: 1,
			type: "USER_UPDATE",
		});
		const log = auditLogs.entries.first();
		const data = { oldUser, newUser, log };
		dbLogging(data, newUser.presence.guild.name);
	} catch (err) {
		console.error(err);
	}
};
