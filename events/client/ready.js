const { prefix } = require('../../config.json');
const chalk = require('chalk');

module.exports = async (Discord, client) => {

	client.user.setAvatar('https://cdn.heptagram.xyz/HeptagramSquare.png');
	client.user.setStatus('online');
	client.user.setActivity(`${prefix}help`, { type: 'LISTENING' });


	console.log(chalk.magenta('Starting Heptagram\nNode version: ' + process.version + '\nDiscord.js version: ' + Discord.version));
	console.log(chalk.green(`Logged in as ${client.user.username}. Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`));

	console.log(chalk.cyanBright(`Activity set to ${client.presence.activities[0].name}.`));
};