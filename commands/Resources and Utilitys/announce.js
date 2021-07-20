const { prefix, colors } = require('../../config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'announce',
	description: 'Make an Announcemnet in your Server',
	category: 'Resources',

	execute: ({ message, args }) => {

		const anchannel = message.mentions.channels.first();
		if (!message.member.hasPermission('MANAGE_MESSAGES')) {
			return message.channel.send('You don\'t have enogh Permissions');
		}
		if (!message.guild.me.hasPermission('MANAGE_MESSAGES')) {
			return message.channel.send('I don\'t have enough Permissions');
		}
		if (!anchannel) {
			message.channel.send('Please specify a channnel and message to make an Announcement.');
			message.channel.send(`Command Usage: \`${prefix} <channel> <msg>\``);

		}
		if (!args.slice(1).join(' ')) {
			return message.channel.send('');
		}

		const embed = new Discord.MessageEmbed()
			.setTitle('**Announcement!**')
			.setDescription(args.slice(1).join(' '), { allowedMentions: { parse: ['users'] } })
			.setColor(colors.heptagram)
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", 'https://cdn.heptagram.xyz/Logos/HeptagramLogo%28square%29.png');		anchannel.send(embed);

		const anembed = new Discord.MessageEmbed()
			.setTitle('Done!')
			.setDescription(`Announcement has been sent to ${anchannel}`)
			.setColor(colors.heptagram)
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", 'https://cdn.heptagram.xyz/Logos/HeptagramLogo%28square%29.png');

		message.channel.send(anembed);
	},
};
