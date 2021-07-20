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

	client.on('message', async message => {
		const { guild, content } = message;

		const code = content.split('discord.gg/')[1];

		// check to see if message contains a discord invite link
		if (content.includes('https://discord.gg/')) {

			const isOurInvite = await isInvite(guild, code);
			if (!isOurInvite) {
				message.delete();
				message.reply('Please do not advertise other discord servers.');
			}
		}
	});
};

module.exports.config = {
	// The display name that server owners will see.
	// This can be changed at any time.
	displayName: 'Anti Ad',

	// The name the database will use to set if it is enabled or not.
	// This should NEVER be changed once set, and users cannot see it.
	dbName: 'ANTI AD',

	// Being true means a database connection must be present before the
	// feature is enabled.
	loadDBFirst: true,
};