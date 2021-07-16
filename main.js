const Discord = require('discord.js');
const chalk = require('chalk');
const DisTube = require('distube');

const { prefix, token } = require('./config.json');
const mongo = require('./mongo');
const antiAd = require('./anti-Ad');

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
client.cooldowns = new Discord.Collection();

// music bot
client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });
client.distube
	.on('playSong', (message, queue, song) => message.channel.send(new Discord.MessageEmbed()
		.setTitle('Playing')
		.setDescription(`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`)),
	)
	.on('addSong', (message, queue, song) => message.channel.send(new Discord.MessageEmbed()
		.setTitle('Queued')
		.setDescription(`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)));

['command_handler', 'event_handler'].forEach(handler => {
	require(`./handlers/${handler}`)({ client, Discord });
});

client.on('ready', async () => {
	console.log(chalk.blueBright('Bot online and Ready!'));

	await mongo().then(mongoose => {
		try {
			console.log(chalk.blue('Connected to Heptagram MongoDB database!'));
		}
		finally {
			mongoose.connection.close();
		}
	});
});

antiAd(client);

client.on('message', async message => {
	const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
	if (message.content.match(prefixMention)) {
		return message.reply(`Hey there! Need some help? My commands can be accessed through my prefix. My prefix in this server is \`${prefix}\`. You can use \`${prefix}help\` for a list of all my commands.`);
	}
});

client.login(token);
