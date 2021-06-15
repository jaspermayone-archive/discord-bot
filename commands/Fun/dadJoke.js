const { MessageEmbed } = require('discord.js');
const dadJokes = require('@mikemcbride/dad-jokes');
const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');

module.exports = {
	name: 'dadjoke',
	category: 'fun',
	description: 'Says a random dad joke.',
	guildOnly: false,

	execute({ message, client, args, roles }) {
		const embed = new MessageEmbed()
			.setColor(colors.heptagram)
			.setTitle('Here\'s a good one...')
			.setTimestamp()
			.setDescription(`${dadJokes.random()}`);

		message.channel.send(embed);
	},
};