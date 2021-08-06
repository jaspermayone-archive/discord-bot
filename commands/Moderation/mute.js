const { MessageEmbed } = require('discord.js');
const { colors, roles, cdn } = require('../../config.json');

const ms = require('ms');
module.exports = {
	name: 'mute',
	guildOnly: true,
	description: 'mutes user',
	category: 'Moderation',
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: "<@user you want to mute>",
	permissions: ["MUTE_MEMBERS"],

	execute: async ({ message, args }) => {

		const target = message.mentions.users.first();

		const mainRole = message.guild.roles.cache.get(roles.users);
		const muteRole = message.guild.roles.cache.get(roles.muted);

		const memberTarget = message.guild.members.cache.get(target.id);

		if (!args[1]) {
			memberTarget.roles.remove(mainRole.id);
<<<<<<< HEAD
			memberTarget.roles.add(muteRole.id);
			message.channel.send({ content: `<@${memberTarget.user.id}> has been muted` });
			return;
		}
		memberTarget.roles.remove(mainRole.id);
		memberTarget.roles.add(muteRole.id);
		message.channel.send({ content: `<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}` });

		setTimeout(function() {
			memberTarget.roles.remove(muteRole.id);
			memberTarget.roles.add(mainRole.id);
		}, ms(args[1]));
=======
			await memberTarget.roles.add(muteRole.id).then(() => {

				const membed = new MessageEmbed()
					.setColor(colors.heptagram)
					.setTitle(`:white_check_mark: **Success!** :white_check_mark:`)
					.setDescription(`You have succesfully muted <@${memberTarget.user.id}>.`)
					.setTimestamp()
					.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

				message.channel.send(membed);
				return;
			});
		}
		else {

			memberTarget.roles.remove(mainRole.id);
		 await memberTarget.roles.add(muteRole.id).then(() => {

				const msembed = new MessageEmbed()
					.setColor(colors.heptagram)
					.setTitle(`:white_check_mark: **Success!** :white_check_mark:`)
					.setDescription(`You have succesfully muted <${memberTarget.user.id}> for ${ms(ms(args[1]))}`)
					.setTimestamp()
					.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

				message.channel.send(msembed);

		 });
			setTimeout(function() {
				memberTarget.roles.remove(muteRole.id);
				memberTarget.roles.add(mainRole.id);
			}, ms(args[1]));
		}
>>>>>>> staged
	},
};