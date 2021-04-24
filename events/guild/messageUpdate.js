const dbLogging = require("../dbLogging");

module.exports = async (Discord, client, oldMessage, newMessage) => {
	try {
		const auditLogs = await newMessage.guild.fetchAuditLogs({
			limit: 1,
			type: "MESSAGE_UPDATE",
		});
		const log = auditLogs.entries.first();
		const data = {
			oldMessage,
			newMessage,
			action: "MESSAGE_UPDATE",
			actionType: "UPDATE",
			content: message.content,
			channel: message.channel.name,
			log,
		};
		dbLogging(data, newMessage.guild.name);
	} catch (err) {
		console.error(err);
	}
};
