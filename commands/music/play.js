const { replies, emoji } = require('../../config.json');
module.exports = {
	name: 'play',
	description: 'Plays the given song.',
	execute: async ({ Discord, client, message, args }) => {

		if(!message.member.voice.channel) {
			message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
			message.react(emoji.x);
			const embed = new Discord.MessageEmbed()
				.setTitle('Error')
				.setDescription(replies.mustVC);

			return message.channel.send(embed);
		}
		else if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) {
			message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
			message.react(emoji.x);

			const embed = new Discord.MessageEmbed()
				.setTitle('Error')
				.setDescription(replies.sameVC);

			return message.channel.send(embed);
		}
		else if(!args.join(' ')) {
			message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
			message.react(emoji.x);
			const embed = new Discord.MessageEmbed()
				.setTitle('Error')
				.setDescription('Please provide a URL or a title.');
			return message.channel.send(embed);
		}
		else {
			const music = args.join(' ');
			client.distube.play(message, music);
		}
	},
};

