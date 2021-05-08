const Discord = require('discord.js');
const mongoose = require('mongoose');
const fs = require('fs');
const AuditLog = require('discord-auditlog');
const config = require('dotenv').config();
const { prefix, token, roles, MongoDB, serverId } = require('./config.json');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

const { Player } = require("discord-player"); //Create a new Player (Youtube API key is your Youtube Data v3 key)

const player = new Player(client); //To easily access the player


client.player = player;
client.config = require('./config.json');
client.emotes = client.config.emotes;
client.colors = client.config.colors;
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
	console.log('Connected to Heptagram MongoDB database!')
}).catch((err) => {
	console.log(err);
});

client.on("message", async message => {
	const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
	if (message.content.match(prefixMention)) {
	  return message.reply(`My prefix is \`${prefix}\``);
	}
})

client.login(token);

// Channel log - specify the channel for the type of events
AuditLog(client, {
	[serverId]: {
		auditlog: "audit-log",
		movement: "in-out",
		auditmsg: "audit-msg", // Default to false, recommend to set a channel
		voice: "voice-activity", // Set a Channel name if you want it
		trackroles: "audit-log", // Default to False
		// excludedroles: ['671004697850544111', '671004697850544112']  // This is an OPTIONAL array of Roles ID that won't be tracked
	},
});
