//
// main.js is basicly what makes the bot run. There are more comments throughout that help descripe some elements.
//

const fs = require('fs');
const Discord = require('discord.js');
const config = require('dotenv').config();
const { prefix, token } = require('./config.json');


const prefix = '!';

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const webhookClient = new Discord.WebhookClient(config.webhookID, config.webhookToken);

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
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
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);
