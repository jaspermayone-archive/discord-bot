const { prefix, colors } = require('../../config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'bots',
	guildOnly: false,
	description: 'sends a discription of all the Heptagram bots.',
	category: 'Resources',

	callback: ({ message }) => {

		const embed = new Discord.MessageEmbed()
			.setColor(colors.heptagram)
			.setTitle('Heptagram Bot List')
			.setDescription('Here is a discription of all the Heptagram bots!')
			.addFields(
				{ name: 'Heptagram', value: `This is the normal Heptagram Bot. Invite it to your server using \`${prefix}invite\`.`, inline: true },
				{ name: 'Heptagram Canary', value: 'This is the public bot for testing. You can get more info about inviting this bot in the Heptagram server', inline: true },
				{ name: 'Heptagram Testing', value: 'You may see this bot in the offical server. This bot can\'t be invited and is for staff testing only.', inline: true },
			)
			.addFields(
				{ name: 'Join the discord server!', value: 'You can join the Heptagram bot discord server at https://discord.gg/HSupF99kpq', inline: false },
			)
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", 'https://cdn.heptagram.xyz/Logos/HeptagramLogo%28square%29.png');

		message.channel.send(embed);
	},
};