module.exports = {
	name: 'clyde',
	description: 'Get a custom clyde message!',
	category: 'Fun',
	expectedArgs: "<message you want clyde to say>",
	minArgs: 1,
	maxArgs: -1,

	execute: async (message, args) => {

		const clydeMessage = args.join(' ');

		message.message.channel.send({ files : [{ attachment: `https://ctk-api.herokuapp.com/clyde/${clydeMessage}`, name: 'file.jpg' }] });
	},
};
