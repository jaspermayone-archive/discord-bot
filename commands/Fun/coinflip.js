const { MessageEmbed } = require('discord.js');
const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');

module.exports = {
	name: 'coinflip',
	category: 'fun',
	description: 'Flips a coin for heads or tails.',
	execute({ message, client, args, roles }) {
		const embed = new MessageEmbed()
			.setColor(colors.heptagram)
			.setTitle('A coin was flipped..')
			.setTimestamp();

		const number = Math.floor(Math.random() * 2);

		if (number === 0) embed.addField('Result', '\`Heads\`');
		else embed.addField('Result', '\`Tails\`');

		message.channel.send(embed);
	},
};