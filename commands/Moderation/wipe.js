const { MessageEmbed } = require('discord.js');
const { colors, cdn } = require('../../config.json');

module.exports = {
	name: 'wipe',
	description: 'clear with bigger options',
	category: 'Moderation',
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: "<number of messgaes you want to clear>",
	permissions: ["MANAGE_MESSAGES"],

	async execute({ message, args }) {
		if (isNaN(args[0])) return message.reply({ content: 'Please enter a number instead of text.' });

		if (args[0] > 100) return message.reply({ content: 'Slow down! This command resticts to 100 messages per command for safety.' });
		if (args[0] < 11) return message.reply({ content: 'You must delete at least 11 messages. Please use clear for smaller jobs.' });

		await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
			message.channel.bulkDelete(messages);
		}).finally(() => {

			const embed = new MessageEmbed()
				.setColor(colors.heptagram)
				.setTitle(`:white_check_mark: **Success!** :white_check_mark:`)
				.setDescription(`You have succesfully wiped ${args[0]} messages.`)
				.addFields({ name: '**PLEASE NOTE:**', value: 'This will only delete messages that are under 14 days old. ', inline: true })
				.setTimestamp()
				.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

			message.channel.send({ embeds: [embed] });
		});
	},
};