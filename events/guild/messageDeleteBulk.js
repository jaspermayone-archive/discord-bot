const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, messages) => {
	try {
		const auditLogs = await messages.guild.fetchAuditLogs({
			limit: 1,
			type: "MESSAGE_BULK_DELETE"
		});
		const log = auditLogs.entries.first();
		const data = {
			action: "MESSAGE_BULK_DELETE",
			actionType: "BULK_DELETE",
			content: message.content,
			channel: message.channel.name,
			messages,
			log,
		};
		dbLogging(data, messages.guild.name);
	} catch (err) {
		console.error(err);
	}
};
