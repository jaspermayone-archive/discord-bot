const Discord = require('discord.js');
const mongoose = require('mongoose');
const fs = require('fs');
const chalk = require('chalk');
const config = require('dotenv').config();
const { prefix, token, roles, MongoDB, serverId } = require('./config.json');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
	require(`./handlers/${handler}`)({ client, Discord });
})

const webhookClient = new Discord.WebhookClient(config.webhookID, config.webhookToken);

mongoose.connect((MongoDB), {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
}).then(() => {
	console.log(chalk.green('Connected to Heptagram MongoDB database!'));
}).catch((err) => {
	console.log(err);
});

client.on("message", async message => {
	const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
	if (message.content.match(prefixMention)) {
	  return message.reply(`My prefix is \`${prefix}\``);
	}
})
//Putting my token into .env

client.login(token);
