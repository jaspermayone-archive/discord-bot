const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, oldUser, newUser) => {
	try {
		const auditLogs = await newUser.presence.guild.fetchAuditLogs({
			limit: 1,
			type: "USER_UPDATE",
		});
		const log = auditLogs.entries.first();
		await dbLogging(log, { oldUser, newUser });
	} catch (err) {
		console.error(err);
	}
};
