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

	execute: ({ message, args }) => {

		const anchannel = message.mentions.channels.first();

		if (!args.slice(1).join(' ')) {
			return message.channel.send('');
		}

		const embed = new Discord.MessageEmbed()
			.setTitle('**Announcement!**')
			.setColor(colors.heptagram)
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

		anchannel.send(embed);

		const anembed = new Discord.MessageEmbed()
			.setTitle('Done!')
			.setDescription(`Announcement has been sent to ${anchannel}`)
			.setColor(colors.heptagram)
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

		message.channel.send(anembed);
	},
};
