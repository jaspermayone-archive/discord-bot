//
// main.js is basicly what makes the bot run. There are more comments throughout that help descripe some elements.
//

const fs = require('fs');
const Discord = require('discord.js');
const db = require('quick.db');

const config = require('dotenv').config();
const { token, roles } = require('./config.json');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const webhookClient = new Discord.WebhookClient(config.webhookID, config.webhookToken);

client.commands = new Discord.Collection();
client.description = new Discord.Collection();

const prefix = db.get(`guild_${message.guild.id}_prefix`) || "DEFAULT_PREFIX";
client.prefix = prefix;

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
		client.description.set(command.description, command);
	}
}

client.once('ready', () => {
	console.log('Bot Ready and Online!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute({ message, args, Discord, client, roles });
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command! Please contact a developer in our support server.');
	}
});

client.login(token);
 
