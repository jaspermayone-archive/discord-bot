const Discord = require('discord.js');
const { emoji, replies } = require('../../config.json');
module.exports = {
	name: 'skip',
	description: 'Skips the playing song.',
	execute: async ({ client, message }) => {
		if(!message.member.voice.channel) {
			message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
			message.react(emoji.x);
			const embed = new Discord.MessageEmbed()
				.setTitle('Error')
				.setDescription(replies.mustVC);

			return message.channel.send(embed);
		}
		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
			message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
			message.react(emoji.x);

			const embed = new Discord.MessageEmbed()
				.setTitle('Error')
				.setDescription(replies.sameVC);

			return message.channel.send(embed);
		}

		const queue = await client.distube.getQueue(message);

		if(queue) {
			client.distube.skip(message);

			const embed = new Discord.MessageEmbed()
				.setTitle('Skip')
				.setDescription(`${emoji.checkmark} The song has skipped.`);
			return message.channel.send(embed);
		}
		else if (!queue) {
			const embed = new Discord.MessageEmbed()
				.setTitle('Empty Queue')
				.setDescription(`The queue is empty. If you want to stop the bot, use !stop instead.`);
			return message.channel.send(embed);
		}
	},
};