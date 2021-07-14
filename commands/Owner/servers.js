const { IDs, replies } = require('../../config.json');

module.exports = {
	name: 'servers',
	description: 'gets list of servers bot is in.',
	guildOnly: false,

	execute({ client, message, args }) {
		if (message.author.id === (IDs.OwnerID)) {

			if (!args[0]) {
				client.guilds.cache.forEach((guild) => {
					message.channel.send(`The server ${guild.name} (\`${guild.id}\`) has a total of ${guild.memberCount} members.`);
				});
			}
			else {
				const serverArg = args[0];
				console.log(serverArg);
			}
		}
		else {
			message.channel.send(replies.restricted);
		}
	},
};
