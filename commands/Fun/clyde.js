const { prefix } = require('../../config.json');

module.exports = {
	name: 'clyde',
	description: 'Get a custom clyde message!',
	category: 'fun',

	execute: async (message) => {
		if (!message.args[0]) {
			return message.message.channel.send(`Usage: ${prefix}clyde <msg>`);
		}
		const clydeMessage = message.args.slice(0).join(' ');

		message.message.channel.send({ files : [{ attachment: `https://ctk-api.herokuapp.com/clyde/${clydeMessage}`, name: 'file.jpg' }] });
	},
};
