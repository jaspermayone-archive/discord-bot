const Discord = require('discord.js');
const { colors, cdn } = require('../../config.json');

module.exports = {
	name: 'api',
	aliases: ['API'],
	description: 'gives info about the Heptagram API',
	category: 'Info',
	minArgs: 0,
	maxArgs: 0,
	expectedArgs: "",
	cooldown: '1m',

	callback: ({ message }) => {
		const embed = new Discord.MessageEmbed()
			.setTitle('Heptagram API')
			.setColor(colors.heptagram)
			.setDescription('The Heptagram team is curently working on developing an API. Stay tuned for more info.')
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);
		message.reply({ embeds: [embed] });
	},
};
