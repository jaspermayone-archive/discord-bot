//This is the ping command. The ping command currently just returns pong.
// We would like to have it give the bot ping in the future.

  
module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 5,
    args: false,
	execute(message) {
		message.channel.send('Pong.');
	},
};