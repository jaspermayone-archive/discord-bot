const { MessageEmbed } = require('discord.js');
const { colors, cdn } = require('../../config.json');

module.exports = {
	name: 'ban',
	description: 'bans users',
	guildOnly: true,
	category: 'Moderation',
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: "<@user you want to ban>",
	permissions: ["BAN_MEMBERS"],

	execute: async ({ message }) => {
		const member = message.mentions.users.first();
		const memberTarget = message.guild.members.cache.get(member.id);

		await memberTarget.ban().then(() => {

			const membed = new MessageEmbed()
				.setColor(colors.heptagram)
				.setTitle(`:white_check_mark: **Success!** :white_check_mark:`)
				.setDescription(`You have succesfully banned ${memberTarget}.`)
				.setTimestamp()
				.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

			return message.channel.send(membed);
		});
	},
};