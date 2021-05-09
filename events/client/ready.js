const dbLogging = require("../dbLogging");
const { prefix, token, roles, MongoDB, serverId } = require('../../config.json');
const chalk = require('chalk');

module.exports = async (Discord, client, args) => {
	
	console.log(chalk.magenta("Starting Heptagram\nNode version: " + process.version + "\nDiscord.js version: " + Discord.version));
	console.log(chalk.cyan(`Logged in as ${client.user.username}. Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`));
	
	client.user.setStatus('online');
    client.user.setActivity(`${prefix}help`, { type: "LISTENING" })
		.then(presence => console.log(chalk.cyanBright(`Activity set to ${presence.activities[0].name}.`)))
		.catch(console.error);

	const { shard, voice, users, guilds, channels, presence, user, readyAt, commands } = client;
	const data = {
		action: "READY",
		shard,
		voice,
		users,
		guilds,
		channels,
		presence,
		user,
		readyAt,
		commands,
	};
	dbLogging(data);
}