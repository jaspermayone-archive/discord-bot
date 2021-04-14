module.exports = async (Discord, client) => {
	console.log("Starting Heptagram\nNode version: " + process.version + "\nDiscord.js version: " + Discord.version);
	console.log(`Logged in as ${client.user.username}. Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`);
	
	client.user.setStatus('online');
	client.user.setActivity('In Development')
		.then(presence => console.log(`Activity set to ${presence.activities[0].name}.`))
		.catch(console.error);
}