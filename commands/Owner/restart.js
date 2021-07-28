const { colors, emoji } = require('../../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'restart',
	aliases: ['r', 're'],
	description: 'restarts bot.',
	category: 'Owner',
	ownerOnly: true,
	hidden: true,

	execute: async ({ client, message }) => {

		const embed = new MessageEmbed()
			.setColor(colors.heptagram)
			.setTitle(`${emoji.status_offline} **Bot Restarting!** ${emoji.status_offline}`)
			.setDescription(`The bot has been qued to restart.`)
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", 'https://cdn.heptagram.xyz/Logos/HeptagramLogo%28square%29.png');

		message.channel.send(embed);
		client.destroy();

		await client.restart().then(() => {
			const restartembed = new MessageEmbed()
				.setColor(colors.heptagram)
				.setTitle(`${emoji.status_online} **Bot Restarted** ${emoji.status_online}`)
				.setDescription(`The bot has restarted.`)
				.setTimestamp()
				.setFooter("Message sent by the Heptagram Bot", 'https://cdn.heptagram.xyz/Logos/HeptagramLogo%28square%29.png');

			message.channel.send(restartembed);
		});
	},
};