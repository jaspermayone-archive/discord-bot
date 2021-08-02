const { MessageEmbed } = require('discord.js');
const { colors, cdn } = require('../../config.json');

module.exports = {
	name: 'kick',
	guildOnly: true,
	description: 'kicks users',
	category: 'Moderation',
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: "<@member you want to kick>",
	permissions: ["KICK_MEMBERS"],

	execute: async ({ message }) => {
		const member = message.mentions.users.first();
		const memberTarget = message.guild.members.cache.get(member.id);

		 await memberTarget.kick().then(() => {
			message.reply('The user has been kicked.');

			const membed = new MessageEmbed()
				.setColor(colors.heptagram)
				.setTitle(`:white_check_mark: **Success!** :white_check_mark:`)
				.setDescription(`You have succesfully kicked ${memberTarget}.`)
				.setTimestamp()
				.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

			return message.channel.send(membed);

		});
	},
};