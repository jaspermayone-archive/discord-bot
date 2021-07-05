const { prefix, IDs, emoji, roles } = require("../../config.json");

module.exports = async (Discord, client, message) => {
	if (message.author.bot) return;

	// command messages
	if (message.content.startsWith(prefix)) {
		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const command = args.shift().toLowerCase();

		if (client.commands.has(command)) {
			try {
				client.commands.get(command).execute({ message, args, Discord, client, roles });
				message.react(emoji.checkmark);
			}
			catch (error) {
				message.react(emoji.x);
				console.log(error);
				message.reply("there was an error trying to execute that command! Please contact a developer in our support server.");
			}
		}
	}
	if (message.author.id == (IDs.OwnerID)) {
		const reactionEmoji = client.emojis.cache.get(emoji.HeptaHeart);
		message.react(reactionEmoji);
	}
	else {}
	const { author, channel, content, mentions } = message;

	const thanksRegex =
	/((?:^|\s)(?:(?:th(?:n[qx]|x)|t[xyq]|tn(?:[x]){0,2})|\w*\s*[.,]*\s*than[kx](?:[sxz]){0,2}|than[kx](?:[sxz]){0,2}(?:[uq]|y(?:ou)?)?)|grazie|arigato(?:[u]{0,1})|doumo|gracias?|spasibo|dhanyavaad(?:hamulu)?|o?brigad(?:o|a)|dziekuje|(?:re)?merci|multumesc|shukra?an|danke)\b/gi;
	if (!thanksRegex.test(content) || !mentions.users.size) {
		return;
	}
	const replies = [];
	const users = mentions.users.map((u) => u);

	for (const user of users) {
	  if (user.id === IDs.BotID) {
			replies.push(
		  "You are quite welcome.",
			);
			continue;
	  }
	  if (user.id === author.id) {
			replies.push(
		  "I suppose you need a pat on the back badly enough to thank yourself.",
			);
			continue;
	  }
	  replies.push(
			`Well done, ${user.username}. It seems you have done something right.`,
	  );
	}
	await channel.send(replies.join("\n"));
};