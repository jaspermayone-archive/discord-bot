const { MessageEmbed } = require('discord.js');
const { colors, cdn } = require('../../config.json');

module.exports = {
	name: 'clear',
	guildOnly: true,
	description: 'clears messages',
	category: 'Moderation',
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: "<number of messages you want to clear>",
	permissions: ["MANAGE_MESSAGES"],

	async execute({ message, args }) {
		if (isNaN(args[0])) return message.reply('Please enter a number instead of text.');

		if (args[0] > 10) return message.reply('Slow down! This command resticts to 10 messages per command for safety.');
		if (args[0] < 2) return message.reply('You must delete at least 2 messages.');

		await message.channel.messages.fetch({ limit: args[0] }).then(messages => {

			message.channel.bulkDelete(messages).finally(() => {

				const membed = new MessageEmbed()
					.setColor(colors.heptagram)
					.setTitle(`:white_check_mark: **Success!** :white_check_mark:`)
					.setDescription(`You have succesfully deleted ${args[0]} messages.`)
					.addFields({ name: '**PLEASE NOTE:**', value: 'This will only delete messages that are under 14 days old. ', inline: true })
					.setTimestamp()
					.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

				return message.channel.send(membed);

			});
		});
	},
};
