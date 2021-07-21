const { MessageEmbed } = require('discord.js');
const math = require('mathjs');
const { colors, cdn } = require('../../config.json');


module.exports = {
	name: 'math',
	description: 'Calculate math',
	category: 'Fun',

	execute({ message, args }) {
		try {
			if (!args[0]) return message.channel.send('Please Give Me Equation!');

			const embed = new MessageEmbed()
				.setColor(colors.heptagram)
				.setTitle('Result')
				.setDescription(math.evaluate(args.join(' ')))
				.setTimestamp()
				.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

			message.channel.send(embed);
		}
		catch (error) {
			message.channel.send('Please Give Me Valid Equation | Try Again Later!').then(() => console.log(error));
		}
	},
};
