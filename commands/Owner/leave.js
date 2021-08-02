const { colors, cdn } = require('../../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'leave',
	aliases: ['el'],
	description: 'pretends a user has left (for testing only)',
	category: 'Owner',
	ownerOnly: true,
	hidden: true,

	execute({ client, message }) {

		client.emit('guildMemberLeave', message.member);

		const embed = new MessageEmbed()
			.setColor(colors.heptagram)
			.setTitle(`Join Emmitted!`)
			.setDescription(`You have succesfully emmited a leave. || <@${message.author.id}>`)
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

		message.channel.send(embed);
	},
};
