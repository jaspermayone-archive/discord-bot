const { MessageEmbed } = require('discord.js');
const dadJokes = require('@mikemcbride/dad-jokes');
const { colors, cdn } = require('../../config.json');

module.exports = {
	name: 'dadjoke',
	category: 'Fun',
	description: 'Says a random dad joke.',

	execute({ message }) {
		const embed = new MessageEmbed()
			.setColor(colors.heptagram)
			.setTitle('Here\'s a good one...')
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`)
			.setDescription(`${dadJokes.random()}`);

		message.channel.send(embed);
	},
};