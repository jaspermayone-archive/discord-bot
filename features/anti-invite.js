const Discord = require('discord.js');
const { colors, cdn } = require('../config.json');

module.exports = (client) => {

	const isInvite = async (guild, code) => {
		return await new Promise(resolve => {
			guild.fetchInvites().then(invites => {
				for (const invite of invites) {
					if (code === invite[0]) {
						resolve(true);
						return;
					}
				}
				resolve(false);
			});
		});
	};

	client.on('messageCreate', async message => {

		const { guild, content } = message;

		const code = content.split('discord.gg/')[1];

		// check to see if message contains a discord invite link
		if (content.includes('https://discord.gg/')) {

			const isOurInvite = await isInvite(guild, code);

			if (!message.author.bot && !isOurInvite) {

				const nolinkembed = new Discord.MessageEmbed()
					.setColor(colors.heptagram)
					.setTitle('No invites here!')
					.setDescription('Sorry, invites aren\'t allowed here!')
					.setTimestamp()
					.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

				await (message.delete()).then(() => {
					message.reply({ embeds: [nolinkembed] });
				});
			}
			else {}
		}
		else {}
	});
};

module.exports.config = {
	// The display name that server owners will see.
	// This can be changed at any time.
	displayName: 'Anti Invite',

	// The name the database will use to set if it is enabled or not.
	// This should NEVER be changed once set, and users cannot see it.
	dbName: 'ANTI INVITE',

	// Being true means a database connection must be present before the
	// feature is enabled.
	loadDBFirst: true,
};