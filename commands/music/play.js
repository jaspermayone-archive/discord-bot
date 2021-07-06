module.exports = {
	name: 'play',
	description: 'Plays the given song.',
	execute: async ({ client, message, args }) => {
		if (!message.member.voice.channel) return message.channel.send('🔴 **Please enter a voice channel to play a song.**');
		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send('🔴 **You must be in the same voice channel as me to use this command.**');

		const music = args.join(' ');
		client.distube.play(message, music);

	},
};

