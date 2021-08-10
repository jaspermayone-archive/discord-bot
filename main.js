const { Intents, Client, Discord } = require('discord.js');
const chalk = require('chalk');
const distube = require('distube');

const { config, token } = require('./config.json');

const antiAd = require('./features/anti-link');
const antiInvite = require('./features/anti-invite');
const pjson = require('./package.json');

const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS] });

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

	console.log(chalk.magenta('Starting Heptagram || Version: ' + pjson.version));
	console.log(chalk.green(`Logged in as ${client.user.tag}. Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`));

	console.log(chalk.blueBright('Bot online and Ready!'));

});
client.on("threadCreate", (thread) => thread.join());

antiInvite(client);
antiAd(client);

client.login(token);
client.config = config;
