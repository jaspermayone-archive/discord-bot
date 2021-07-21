const { MessageEmbed } = require('discord.js');
const { colors, cdn } = require('../../config.json');

module.exports = {
	name: 'coinflip',
	category: 'Fun',
	description: 'Flips a coin for heads or tails.',
	minArgs: 0,
	maxArgs: 0,
	expectedArgs: "",

	execute({ message }) {
		const embed = new MessageEmbed()
			.setColor(colors.heptagram)
			.setTitle('A coin was flipped..')
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

		const number = Math.floor(Math.random() * 2);

		if (number === 0) embed.addField('Result', '`Heads`');
		else embed.addField('Result', '`Tails`');

		message.channel.send(embed);
	},
};