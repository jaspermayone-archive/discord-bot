const { colors } = require('../../config.json');

module.exports = {
	name: 'lock',
	category: 'moderation',
	description: 'Locks a Channel',
	guildOnly: true,
	execute: async ({ message, roles, Discord }) => {
		if (!(message.member.hasPermission('MANAGE_SERVER', 'MANAGE_CHANNELS') && message.member.roles.cache.has(roles.admin))) {
			return message.channel.send('You don\'t have enough Permissions');
		}

		message.channel.overwritePermissions([
			{
				id: message.guild.id,
				deny: ['SEND_MESSAGES'],
			},
		]);

		const embed = new Discord.MessageEmbed()
			.setTitle('Channel Updates')
			.setDescription(`${message.channel} has been Locked`)
			.setColor(colors.heptagram)
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", 'https://cdn.heptagram.xyz/Logos/HeptagramLogo%28square%29.png');


		await message.channel.send(embed);

		message.delete();
	},
};
