const { MessageEmbed } = require('discord.js');
const { colors } = require('../../config.json');

module.exports = {
	name: 'diceroll',
	category: 'fun',
	description: 'Rolls a dice for a number 1-6.',

	execute({ message }) {
		const embed = new MessageEmbed()
			.setColor(colors.heptagram)
			.setTitle('A dice was rolled..')
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", 'https://cdn.heptagram.xyz/Logos/HeptagramLogo%28square%29.png');

		const number = Math.floor(Math.random() * 6);
		const images =
			['https://upload.wikimedia.org/wikipedia/commons/2/2c/Alea_1.png',
				'https://upload.wikimedia.org/wikipedia/commons/b/b8/Alea_2.png',
				'https://upload.wikimedia.org/wikipedia/commons/2/2f/Alea_3.png',
				'https://upload.wikimedia.org/wikipedia/commons/8/8d/Alea_4.png',
				'https://upload.wikimedia.org/wikipedia/commons/5/55/Alea_5.png',
				'https://upload.wikimedia.org/wikipedia/commons/f/f4/Alea_6.png'];

		embed.setImage(images[number]);

		message.channel.send(embed);
	},
};