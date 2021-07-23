const Discord = require('discord.js');
const { colors, cdn } = require('../config.json');

module.exports = (client) => {
	client.on('message', async message => {

		const linkRegex =
        /(([a-z]+:\/\/)?(([a-z0-9-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|xyz|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-.~]+)*(\/([a-z0-9_\-.]*)(\?[a-z0-9+_\-.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;

		const hasLink = linkRegex.test(message.content);

		if (hasLink) {
			const nolinkembed = new Discord.MessageEmbed()
				.setColor(colors.heptagram)
				.setTitle('No links here!')
				.setDescription('Sorry, links aren\'t allowed here!')
				.setTimestamp()
				.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

			await (message.delete()).then(() => {
				message.channel.send(nolinkembed);
			});
		}
	});
};

module.exports.config = {
	// The display name that server owners will see.
	// This can be changed at any time.
	displayName: 'Anti Link',

	// The name the database will use to set if it is enabled or not.
	// This should NEVER be changed once set, and users cannot see it.
	dbName: 'ANTI LINK',

	// Being true means a database connection must be present before the
	// feature is enabled.
	loadDBFirst: true,
};