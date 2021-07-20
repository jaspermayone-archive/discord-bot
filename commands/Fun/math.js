const { MessageEmbed } = require('discord.js');
const math = require('mathjs');
const { colors } = require('../../config.json');


module.exports = {
	name: 'math',
	description: 'Calculate math',
	category: 'fun',

	execute({ message, args }) {
		try {
			if (!args[0]) return message.channel.send('Please Give Me Equation!');

			const embed = new MessageEmbed()
				.setColor(colors.heptagram)
				.setTitle('Result')
				.setDescription(math.evaluate(args.join(' ')))
				.setTimestamp()
				.setFooter("Message sent by the Heptagram Bot", 'https://cdn.heptagram.xyz/Logos/HeptagramLogo%28square%29.png');

			message.channel.send(embed);
		}
		catch (error) {
			message.channel.send('Please Give Me Valid Equation | Try Again Later!').then(() => console.log(error));
		}
	},
};
