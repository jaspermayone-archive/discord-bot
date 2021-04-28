const dbLogging = require("../dbLogging");

// This event only triggers if the client has MANAGE_GUILD permissions for the guild, or MANAGE_CHANNEL permissions for the channel.
module.exports = async (Discord, client, invite) => {
	try {
		const auditLogs = await invite.guild.fetchAuditLogs({
			type: "INVITE_DELETE",
		});
		const log = auditLogs.entries.first();
		const data = { log, invite };
		dbLogging(data, invite.guild.name);
	} catch (err) {
		console.error(err);
	}
};