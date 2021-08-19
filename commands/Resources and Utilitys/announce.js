/* eslint-disable no-unused-vars */
const { cdn, colors } = require('../../config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'announce',
	description: 'Make an Announcemnet in your Server',
	category: 'Resources',
	minArgs: 2,
	maxArgs: 2,
	expectedArgs: "<channel> <msg>",
	permissions: ["MANAGE_MESSAGES"],
	cooldown: '1m',

	callback: ({ message, args }) => {

		message.reply('This command is curently under reconstuction, and it doesn\t quite work yet.');

		/* 	const anchannel = message.mentions.channels.first();

		if (!args.slice(1).join(' ')) {
			return message.reply('');
		}

		const embed = new Discord.MessageEmbed()
			.setTitle('**Announcement!**')
			.setColor(colors.heptagram)
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

		anchannel.send({ embeds: [embed] });

		const anembed = new Discord.MessageEmbed()
			.setTitle('Done!')
			.setDescription(`Announcement has been sent to ${anchannel}`)
			.setColor(colors.heptagram)
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

		message.reply({ embeds: [anembed] }); */

	},
};
