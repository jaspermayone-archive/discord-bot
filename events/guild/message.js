const { prefix, roles } = require('../../config.json');

module.exports = async (Discord, client, message) => {
	if (message.author.bot) return

	let isCommand = false;

	//begin added content
	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	} 
	//end added content

	// command messages
	if (message.content.startsWith(prefix)) {
		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const command = args.shift().toLowerCase();
	
		if (client.commands.has(command)) {
			isCommand = true;
			try {
				client.commands.get(command).execute({ message, args, Discord, client, roles });
			} catch (error) {
				console.log(error);
				message.reply('there was an error trying to execute that command! Please contact a developer in our support server.');
			}
		}	
	} 

	const auditLogs = await message.guild.fetchAuditLogs({ type: 'MESSAGE' });
	const log = auditLogs.entries.first();
	const data = {
		action: "MESSAGE",
		actionType: "ADD",
		isCommand,
		content: message.content,
		channel: message.channel.name,
		message,
		log,
	};
}