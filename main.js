const Discord = require('discord.js');
const chalk = require('chalk');
const distube = require('distube');
const WOKCommands = require('wokcommands');

const { token, colors, MongoDB, IDs, emoji } = require('./config.json');
const antiAd = require('./features/anti-link');
const antiInvite = require('./features/anti-invite');

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

// Welcome messages. Requires a channel named `#welcome`.
client.on("guildMemberAdd", async member => {
	if (member.id === bot.user.id) return // If a bot was added to a server, do not send a welcome message.
	let welcomemsgs = [
	  `Welcome, ${member}, to the Heptagram Discord server. If you need any help, head over to the <#826519674640269373> channel. :wave: <:HeptagramLogo:874265504813056020>`,
	  `Hi there, ${member}! We're glad to have you here! :smile:`,
	  `${member} has just joined us! Say hello in the <#869607626185527366> channel! :grin:`
	]

	let msg = Math.floor(Math.random() * welcomemsgs.length)
	getChannel(member.guild, "welcome")
	  .send(welcomemsgs[msg].toString())
})

// Leaving messages. Requires a channel named `#leaves`.
client.on("guildMemberRemove", member => {
	if (member.id === bot.user.id) return  // If a bot was removed from a server, do not send a leave message.
	let leavemsgs = [
	  `Goodbye, **${member.user.tag}**. We hope you come back. :wink:`,
	  `${member.user.tag} just left the server. :wave:`,
	]
	let msg = Math.floor(Math.random() * leavemsgs.length)
	getChannel(member.guild, "leaves").typeMessage(leavemsgs[msg])
})

client.distube = new distube(client, { searchSongs: false, emitNewSongOnly: true });
client.distube
	.on('playSong', (message, queue, song) => message.channel.send(new Discord.MessageEmbed()
		.setTitle('Playing')
		.setDescription(`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`)),
	)
	.on('addSong', (message, queue, song) => message.channel.send(new Discord.MessageEmbed()
		.setTitle('Queued')
		.setDescription(`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)));

client.on('ready', async () => {

	client.user.setStatus('online');
	client.user.setActivity(`${client.guilds.cache.size} servers!`, { type: 'WATCHING' });


	console.log(chalk.magenta('Starting Heptagram\nNode version: ' + process.version + '\nDiscord.js version: ' + Discord.version));
	console.log(chalk.green(`Logged in as ${client.user.username}. Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`));

	new WOKCommands(client, {
		commandsDir: 'commands',
		featuresDir: 'features',
		messagesPath: 'messages.json',
		showWarns: true,
		del: -1,
		ignoreBots: true,
		dbOptions: {
			keepAlive: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		},
		testServers: [`${IDs.ServerID}`],
	})
		.setBotOwner([`${IDs.OwnerID}`])
		.setDefaultPrefix('!')
		.setColor(colors.heptagram)
		.setMongoPath(MongoDB)
		.setDisplayName('Heptagram')
		.setCategorySettings([
			{
				name: 'Examples',
				emoji: '🚧',
				hidden: true,
			},
			{
				name: 'Development',
				emoji: '🚧',
				hidden: true,
			},
			{
				name: 'Fun',
				emoji: '🎮',
			},
			{
				name: 'Moderation',
				emoji: '🔨',
			},
			{
				name: 'Music',
				emoji: '🎵',
			},
			{
				name: 'Owner',
				emoji: `${emoji.HeptaHeart}`,
				customEmoji: true,
				hidden: true,
			},
			{
				name: 'Resources',
				emoji: '📂',
			},
			{
				name: 'Utilitys',
				emoji: '🦾',
			},
			{
				name: 'Info',
				emoji: '📒',
			},
			{
				name: 'Thanks',
				emoji: '🤝',
			},
		]);

	console.log(chalk.blueBright('Bot online and Ready!'));

});
antiInvite(client);
antiAd(client);

client.login(token);
