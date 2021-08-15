const { colors, cdn } = require('../../config.json');
const { MessageEmbed } = require('discord.js');
const pjson = require('./package.json');

module.exports = {
	name: 'version',
	aliases: ['v', 'versn'],
	description: 'Displays bot versions',
	category: 'Owner',
	ownerOnly: true,
	hidden: true,

	execute: async ({ message }) => {

		const embed = new MessageEmbed()
			.setColor(colors.heptagram)
			.setTitle(`<:HeptagramLogo:874265504813056020> Bot Versions: <:HeptagramLogo:874265504813056020>`)
			.addFields(
				{ name: 'Node Version:', value: `${process.versions.node}`, inline: true },
				{ name: 'Discord.js Version:', value: `${process.versions.discord.js}`, inline: true },
				{ name: 'Mongoose Version:', value: `${process.versions.mongoose}`, inline: true },
				{ name: 'Bot Version:', value: `${pjson.version}`, inline: true },
			)
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

		message.reply({ embeds: [embed] });
	},
};
