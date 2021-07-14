const Discord = require('discord.js');
const { emoji, replies } = require('../../config.json');
module.exports = {
	name: 'stop',
	description: 'Stops the playing song.',
	guildOnly: false,
	category: 'Music',
	execute: async ({ client, message }) => {
		if(!message.member.voice.channel) {
			message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
			message.react(emoji.x);
			const embed = new Discord.MessageEmbed()
				.setTitle('Error')
				.setDescription(replies.mustVC);

			return message.channel.send(embed);
		}
		else if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
			if(message.reactions) {
				message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
			}
			message.react(emoji.x);

			const embed = new Discord.MessageEmbed()
				.setTitle('Error')
				.setDescription(replies.sameVC);

			return message.channel.send(embed);
		}

		client.distube.stop(message);
		const embed = new Discord.MessageEmbed()
			.setTitle('Stop')
			.setDescription(`${emoji.checkmark} The song has stopped.`);

		return message.channel.send(embed);
	},
};
