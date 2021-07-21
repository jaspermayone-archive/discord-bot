const { colors, cdn } = require('../../config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'uptime',
	description: 'gets server uptime',
	category: 'Utilitys',
	minArgs: 0,
	maxArgs: 0,
	expectedArgs: "",

	execute: ({ message, client }) => {

		let days = 0;
		const week = 0;
		let uptime = '';
		let totalSeconds = (client.uptime / 1000);
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		const seconds = Math.floor(totalSeconds % 60);
		if (hours > 24) {
			days = days + 1;
			hours = 0;
		}
		if (week - 0) {
			uptime += `${week} week, `;
		}
		if (minutes > 60) {
			minutes = 0;
		}
		uptime += `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

		const embed = new Discord.MessageEmbed()
			.setTitle('Bot Uptime :robot:')
			.setColor(colors.heptagram)
			.setDescription(`Bot Uptime: \`${uptime}\``)
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

		message.channel.send(embed);
	},
};