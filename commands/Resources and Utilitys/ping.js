const { colors } = require('../../config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'ping',
	aliases: ['p'],
	category: 'Utilitys',
	description: 'returns bot ping.',
	execute: ({ message, client }) => {

		const ping = message.createdTimestamp - message.createdTimestamp;

		const embed = new Discord.MessageEmbed()
			.setTitle('Bot Ping :robot:')
			.setColor(colors.heptagram)
			.setDescription(`Bot Latency: \`${ping}ms\`, API Latency: \`${Math.round(message.client.ws.ping)}ms\` Websocket Heartbeat: \`${client.ws.ping}ms.\``)
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", 'https://cdn.heptagram.xyz/Logos/HeptagramLogo%28square%29.png');

		message.channel.send(embed);
	},
};