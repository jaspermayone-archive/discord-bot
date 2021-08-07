const { colors, cdn } = require('../../config.json');
const Discord = require('discord.js');


module.exports = {
	name: 'ping',
	aliases: ['p'],
	category: 'Utilitys',
	description: 'returns bot ping.',
	minArgs: 0,
	maxArgs: 0,
	expectedArgs: "",
	cooldown: '1m',

	execute: ({ message, client }) => {

		const ping = message.createdTimestamp - message.createdTimestamp;

		const embed = new Discord.MessageEmbed()
			.setTitle('Bot Ping :robot:')
			.setColor(colors.heptagram)
			.setDescription(`Bot Latency: \`${ping}ms\`, API Latency: \`${Math.round(message.client.ws.ping)}ms\` Websocket Heartbeat: \`${client.ws.ping}ms.\``)
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

		message.reply({ embeds: [embed] });
	},
};