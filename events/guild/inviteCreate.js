const dbLogging = require("../dbLogging");

// This event only triggers if the client has MANAGE_GUILD permissions for the guild, or MANAGE_CHANNEL permissions for the channel.
module.exports = async (Discord, client, invite) => {
	try {
		const auditLogs = await invite.guild.fetchAuditLogs({
			type: "INVITE_CREATE",
		});
		const log = auditLogs.entries.first();
		await dbLogging(log, { invite });
	} catch (err) {
		console.error(err);
	}
};
