const { MessageEmbed } = require('discord.js');
const { colors, roles, cdn } = require('../../config.json');

module.exports = {
	name: 'unmute',
	guildOnly: true,
	description: 'unmutes user',
	category: 'Moderation',
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: "<@user you want to unmute>",
	permissions: ["MUTE_MEMBERS"],

	execute({ message }) {

		const target = message.mentions.users.first();

		const mainRole = message.guild.roles.cache.get(roles.users);
		const muteRole = message.guild.roles.cache.get(roles.muted);

		const memberTarget = message.guild.members.cache.get(target.id);

		memberTarget.roles.remove(muteRole.id);
		memberTarget.roles.add(mainRole.id).then(() => {

			const embed = new MessageEmbed()
				.setColor(colors.heptagram)
				.setTitle(`:white_check_mark: **Success!** :white_check_mark:`)
				.setDescription(`You have succesfully unmuted <@${memberTarget.user.id}>`)
				.setTimestamp()
				.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

			message.channel.send({ embeds: [embed] });
		});
	},
};