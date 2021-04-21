const { prefix, roles } = require('../../config.json');
const dbLogging = require('../dbLogging');

module.exports = async (Discord, client, message) => {
	// Only logging messages with intended for bot
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	if (command) {
		try {
			client.commands
				.get(command)
				.execute({ message, args, Discord, client, roles });
			const auditLogs = await message.guild
				.fetchAuditLogs({ type: 'MESSAGE' });
			const log = auditLogs.entries.first();
			await dbLogging(log, {
				message,
				action: "MESSAGE",
				actionType: "ADD",
			});
		} catch (err) {
			console.error(err);
			message.reply(
				'There was an error trying to execute that command! Please contact a developer in our support server.'
			);			
		}
	}
}