module.exports = {
	name: 'stop',
	description: 'Stops the playing song.',
	execute: async ({ client, message }) => {
		const queue = await client.distube.getQueue(message);

		if(queue) {
			client.distube.stop(message);

			message.channel.send('⏹ **The song has stopped.**');
		}
		else if (!queue) {
			return;
		}
	},
};