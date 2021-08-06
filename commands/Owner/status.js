const { colors } = require('../../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'status',
	description: 'changes bot status',
	category: 'Owner',
	ownerOnly: true,
	hidden: true,

	execute: async ({ client, message, prefix }) => {
		const content = message.content.replace(`${prefix}status`, '');

		await client.user.setPresence({
			activity: {
				name: content,
				type: 3,
			},
		}).then(() => {

			const embed = new MessageEmbed()
				.setColor(colors.heptagram)
				.setTitle(`:white_check_mark: **Success!** :white_check_mark:`)
				.setDescription(`You have succesfully changed the bot's status to **${content}**`)
				.setTimestamp()
				.setFooter("Message sent by the Heptagram Bot", 'https://cdn.heptagram.xyz/Logos/HeptagramLogo%28square%29.png');

			message.channel.send({ embeds: [embed] });
		});
	},
};
