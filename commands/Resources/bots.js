const { prefix, colors } = require('../../config.json');

module.exports = {
	name: 'bots',
	guildOnly: false,
	description: 'sends a discription of all the Heptagram bots.',
	category: 'Resources',

	execute({ message, Discord }) {

		const embed = new Discord.MessageEmbed()
			.setColor(colors.heptagram)
			.setTitle('Some title')
			.setDescription('Some description here')
			.addFields(
				{ name: 'Heptagram', value: `This is the normal Heptagram Bot. Invite it to your server using \`${prefix}invite\`.`, inline: true },
				{ name: 'Heptagram Canary', value: 'This is the public bot for testing. You can get more info about inviting this bot in the Heptagram server', inline: true },
				{ name: 'Heptagram Testing', value: 'You may see this bot in the offical server. This bot can\'t be invited and is for staff testing only.', inline: true },
			)
			.setFooter('You can join the Heptagram bot discord server at https://discord.gg/HSupF99kpq');

		message.channel.send(embed);
	},
};