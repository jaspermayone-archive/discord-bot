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