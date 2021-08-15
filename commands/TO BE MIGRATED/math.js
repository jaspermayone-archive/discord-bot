const { MessageEmbed } = require('discord.js');
const math = require('mathjs');
const { colors, cdn } = require('../../config.json');


module.exports = {
	name: 'math',
	description: 'Calculate math',
	category: 'Fun',
	minArgs: 1,
	maxArgs: -1,
	expectedArgs: "<Equation you want solved>",
	cooldown: '1m',

	execute({ message, args }) {
		try {

			const embed = new MessageEmbed()
				.setColor(colors.heptagram)
				.setTitle('Result')
				.setDescription(math.evaluate(args.join(' ')))
				.setTimestamp()
				.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

			message.reply({ embeds: [embed] });
		}
		catch (error) {
			console.log(error);
		}
	},
};
