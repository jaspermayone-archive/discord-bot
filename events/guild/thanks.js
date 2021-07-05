const { IDs } = require("../../config.json");

module.exports = async (Discord, client, message) => {

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