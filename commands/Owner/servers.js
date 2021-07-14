const { IDs } = require('../../config.json');

module.exports = {
	name: 'servers',
	description: 'gets list of servers bot is in.',
	guildOnly: false,

	execute({ client, message }) {
		if (message.author.id === (IDs.OwnerID)) {
			client.guilds.cache.forEach((guild) => {
				message.channel.send(`The server ${guild.name} (\`${guild.id}\`) has a total of ${guild.memberCount} members.`);
			});
		}
		else {
			message.channel.send('Sorry, this command is resticted!');
		}
	},
};
