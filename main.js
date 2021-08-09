const { Intents, Client, Discord } = require('discord.js');
const chalk = require('chalk');
const distube = require('distube');

const { config, token } = require('./config.json');

const antiAd = require('./features/anti-link');
const antiInvite = require('./features/anti-invite');
const pjson = require('./package.json');

const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS] });

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
