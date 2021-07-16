const { colors } = require('../../config.json');

module.exports = {
	name: 'repo',
	guildOnly: false,
	description: 'sends the bot repo link',
	category: 'Resources',

	execute({ message, Discord }) {
		const embed = new Discord.MessageEmbed()
			.setTitle('Bot Repo :robot:')
			.setColor(colors.heptagram)
			.setDescription('Heptagram is proud to be open source! You can find our GitHub repo at https://github.com/Heptagram-Bot/Heptagram')
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", 'https://cdn.heptagram.xyz/Logos/HeptagramLogo%28square%29.png');
		message.channel.send(embed);
	},
};