const { colors } = require('../../config.json');

module.exports = {
	name: 'unlock',
	category: 'moderation',
	description: 'Unlock a Channel',
	guildOnly: true,
	execute: async ({ message, Discord }) => {
		if (!(message.member.hasPermission('MANAGE_SERVER', 'MANAGE_CHANNELS'))) {
			return message.channel.send('You don\'t have enough Permissions');
		}

		message.channel.overwritePermissions([
			{
				id: message.guild.id,
				allow: ['SEND_MESSAGES'],
			},
		]);

		const embed = new Discord.MessageEmbed()
			.setTitle('Channel Updates')
			.setDescription(`${message.channel} has been unlocked`)
			.setColor(colors.heptagram)
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", 'https://cdn.heptagram.xyz/Logos/HeptagramLogo%28square%29.png');


		await message.channel.send(embed);

		message.delete();
	},
};