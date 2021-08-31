const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'version',
	aliases: ['v', 'versn'],
	description: 'Displays bot versions',
	category: 'Owner',
	ownerOnly: true,
	hidden: true,

	callback: async ({ message, client }) => {

		const embed = new MessageEmbed()
			.setColor(client.config.colors.heptagram)
			.setTitle(`<:HeptagramLogo:874265504813056020> Bot Versions: <:HeptagramLogo:874265504813056020>`)
			.addFields(
				{ name: 'Node Version:', value: `${process.versions.node}`, inline: true },
				{ name: 'Bot Version:', value: `${client.version}`, inline: true },
			)
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", `${client.config.cdn.sqlogo}`);

		message.reply({ embeds: [embed] });
	},
};
