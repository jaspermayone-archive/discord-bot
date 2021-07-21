const { colors, cdn } = require('../../config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'invite',
	description: 'sends the bot invite link',
	category: 'Resources',

	execute: ({ message }) => {
		const embed = new Discord.MessageEmbed()
			.setTitle('Bot Invite :robot:')
			.setColor(colors.heptagram)
			.setDescription('Heptagram is not yet avaible to be invited to servers. Follow our v1 realese updates channel for updates.')
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

		message.channel.send(embed);
	},
	// message.channel.send('You can invite Heptagram to your server at https://discord.com/oauth2/authorize?client_id=783073095036043274&permissions=8&scope=bot+applications.commands');
};