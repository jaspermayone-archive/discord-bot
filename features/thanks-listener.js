const { IDs } = require('../config.json');

module.exports = (client) => {

	client.on('message', async message => {
		const { author, channel, content, mentions } = message;

		const thanksRegex =
	/((?:^|\s)(?:(?:th(?:n[qx]|x)|t[xyq]|tn(?:[x]){0,2})|\w*\s*[.,]*\s*than[kx](?:[sxz]){0,2}|than[kx](?:[sxz]){0,2}(?:[uq]|y(?:ou)?)?)|grazie|arigato(?:[u]{0,1})|doumo|gracias?|spasibo|dhanyavaad(?:hamulu)?|o?brigad(?:o|a)|dziekuje|(?:re)?merci|multumesc|shukra?an|danke)\b/gi;

		if (!message.author.bot) {

			if (!message.author.bot && !thanksRegex.test(content) || !mentions.users.size) {
				return;
			}
			const replies1 = [];
			const users = mentions.users.map((u) => u);

			for (const user of users) {
	  if (user.id === IDs.BotID) {
					replies1.push(
		  "Of course! Anytime.",
					);
					continue;
	  }
	  if (user.id === author.id) {
					replies1.push(
		  "Why are you thanking yourself? That seems silly.",
					);
					continue;
	  }
	  replies1.push(
					`Well done <@${user.id}>,  \`${author.username}\` thanks you.`,
	  );
			}
			await channel.send(replies1.join("\n"));

		}
		else{}
	});
};

module.exports.config = {
	// The display name that server owners will see.
	// This can be changed at any time.
	displayName: 'Thanks Listener',

	// The name the database will use to set if it is enabled or not.
	// This should NEVER be changed once set, and users cannot see it.
	dbName: 'THANKS LISTENER',

	// Being true means a database connection must be present before the
	// feature is enabled.
	loadDBFirst: true,
};