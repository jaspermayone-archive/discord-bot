const { colors } = require('../../config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'embed',
	description: 'embed example',
	category: 'Examples',
	ownerOnly: true,

	execute({ message }) {

		const embed = new Discord.MessageEmbed()
			.setColor(colors.heptagram)
			.setTitle('Example Embed')
			.setURL('https://Heptagram.xyz/')
			.setAuthor('Heptagram Bot', 'https://cdn.heptagram.xyz/Logos/HeptagramLogo%28square%29.png', 'https://Heptagram.xyz/')
			.setDescription('Some description here')
			.setThumbnail('https://i.imgur.com/wSTFkRM.png')
			.addFields(
				{ name: 'Regular field title', value: 'Some value here' },
				{ name: '\u200B', value: '\u200B' },
				{ name: 'Inline field title', value: 'Some value here', inline: true },
				{ name: 'Inline field title', value: 'Some value here', inline: true },
			)
			.addField('Inline field title', 'Some value here', true)
			.setImage('https://i.imgur.com/wSTFkRM.png')
			.setTimestamp()
			.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

		message.channel.send(embed);
	},
};