module.exports = {
	name: 'nuke',
	description: 'bans users',
	alias: ['erase'],
	guildOnly: true,
	category: 'Moderation',
	minArgs: 0,
	maxArgs: 1,
	expectedArgs: "<@channel or current channel>",
	cooldown: 3000,
	permissions: ["MANAGE_CHANNELS"],

	callback: async ({ message, args }) => {
		const channel = message.channel || message.guild.channels.cache.get(args.join(" "));
		if (!channel) return message.channel.send("Couldn't find the channel ");
		channel.clone().then
		// eslint-disable-next-line no-unexpected-multiline
		((ch) => {
			ch.setParent(message.channel.parent);
			ch.setPosition(message.channel.position);
			message.channel.delete().then(() => {
				ch.send("**Channel Has Been Nuked** \n https://imgur.com/LIyGeCR").then(r => r.delete({ timeout: 5000 }));
			});

		});
	} };