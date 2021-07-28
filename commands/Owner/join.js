const { colors } = require('../../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'join',
	aliases: ['j', 'emmit', 'e'],
	description: 'pretends a new user has joined (for testing only)',
	category: 'Owner',
	ownerOnly: true,
	hidden: true,

	execute({ client, message }) {

		client.emit('guildMemberAdd', message.member);

		const embed = new MessageEmbed()
			.setColor(colors.heptagram)
			.setTitle(`Join Emmitted!`)
			.setDescription(`You have succesfully emmited a join. || <@${message.author.id}>`)
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", 'https://cdn.heptagram.xyz/Logos/HeptagramLogo%28square%29.png');

		message.channel.send(embed);
	},
};
