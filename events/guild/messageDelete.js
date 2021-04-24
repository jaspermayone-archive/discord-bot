const dbLogging = require('../dbLogging');

module.exports = async (Discord, client, message) => {
	try {
		const auditLogs = await message.guild.fetchAuditLogs({
			limit: 1,
			type: "MESSAGE_DELETE",
		});
		const log = auditLogs.entries.first();
		const data = {
			action: "MESSAGE_DELETE",
			actionType: "DELETE",
			content: message.content,
			channel: message.channel.name,
			message,
			log,
		};
		dbLogging(data, message.guild.name);
	} catch (err) {
		console.error(err);
	}
};
