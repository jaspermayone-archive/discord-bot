const { MessageEmbed } = require('discord.js');
const dadJokes = require('@mikemcbride/dad-jokes');
const { colors } = require('../../config.json');

module.exports = {
	name: 'dadjoke',
	category: 'fun',
	description: 'Says a random dad joke.',

	execute({ message }) {
		const embed = new MessageEmbed()
			.setColor(colors.heptagram)
			.setTitle('Here\'s a good one...')
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", 'https://cdn.heptagram.xyz/Logos/HeptagramLogo%28square%29.png')
			.setDescription(`${dadJokes.random()}`);

		message.channel.send(embed);
	},
};