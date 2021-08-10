const Discord = require('discord.js');
const { emoji, replies, cdn } = require('../../config.json');

module.exports = {
	name: 'stop',
	description: 'Stops the playing song.',
	category: 'Music',
	execute: async ({ client, message }) => {
		if(!message.member.voice.channel) {
			message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
			message.react(emoji.x);
			const embed = new Discord.MessageEmbed()
				.setTitle('Error')
				.setDescription(replies.mustVC)
				.setTimestamp()
				.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

			return message.reply({ embeds: [embed] });

		}
		else if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
			if(message.reactions) {
				message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
			}
			message.react(emoji.x);

			const embed = new Discord.MessageEmbed()
				.setTitle('Error')
				.setDescription(replies.sameVC)
				.setTimestamp()
				.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

			return message.reply({ embeds: [embed] });

		}

		client.distube.stop(message);
		const embed = new Discord.MessageEmbed()
			.setTitle('Stop')
			.setDescription(`${emoji.checkmark} The song has stopped.`)
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

		return message.reply({ embeds: [embed] });

	},
};
