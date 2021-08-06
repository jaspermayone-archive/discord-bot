const { replies, emoji, cdn } = require('../../config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'play',
	description: 'Plays the given song.',
	category: 'Music',

	execute: async ({ client, message, args }) => {

		if(!message.member.voice.channel) {
			message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
			message.react(emoji.x);
			const embed = new Discord.MessageEmbed()
				.setTitle('Error')
				.setDescription(replies.mustVC)
				.setTimestamp()
				.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

			return message.channel.send({ embeds: [embed] });

		}
		else if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
			message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
			message.react(emoji.x);

			const embed = new Discord.MessageEmbed()
				.setTitle('Error')
				.setDescription(replies.sameVC)
				.setTimestamp()
				.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

			return message.channel.send({ embeds: [embed] });
		}
		else if(!args.join(' ')) {
			message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
			message.react(emoji.x);
			const embed = new Discord.MessageEmbed()
				.setTitle('Error')
				.setDescription('Please provide a URL or a title.')
				.setTimestamp()
				.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);
			return message.channel.send({ embeds: [embed] });
		}
		else {
			const music = args.join(' ');
			client.distube.play(message, music);
		}
	},
};

