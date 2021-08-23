const { colors, cdn } = require('../../config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'invite',
	description: 'sends the bot invite link',
	category: 'Resources',
	minArgs: 0,
	maxArgs: 0,
	expectedArgs: "",
	cooldown: '1m',

	callback: ({ message }) => {
		const embed = new Discord.MessageEmbed()
			.setTitle('Bot Invite :robot:')
			.setColor(colors.heptagram)
			.setDescription('Heptagram is not yet available to be invited to servers. Follow our v1 release updates channel for stay up to date.')
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

		message.reply({ embeds: [embed] });
	},
	// message.channel.send('You can invite Heptagram to your server at https://discord.com/api/oauth2/authorize?client_id=783073095036043274&permissions=103355329750&redirect_uri=https%3A%2F%2Fwww.heptagram.xyz&scope=bot%20applications.commands');
};
