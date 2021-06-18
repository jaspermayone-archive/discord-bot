const { prefix, OwnerID, emoji, roles } = require('../../config.json');
module.exports = async (Discord, client, message) => {
	if (message.author.bot) return;

	// command messages
	if (message.content.startsWith(prefix)) {
		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const command = args.shift().toLowerCase();

		if (client.commands.has(command)) {
			try {
				client.commands.get(command).execute({ message, args, Discord, client, roles });
				message.react('✅');
			}
			catch (error) {
				message.react('❌');
				console.log(error);
				message.reply('there was an error trying to execute that command! Please contact a developer in our support server.');
			}
		}
	}
	if (message.author.id == (OwnerID)) {
		const reactionEmoji = client.emojis.cache.get(emoji.HeptaHeart);
		message.react(reactionEmoji);
	}
	else {}
};