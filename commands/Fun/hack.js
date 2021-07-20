const { replies } = require('../../config.json');

module.exports = {
	name: 'hack',
	description: 'Another Fun Command',
	category: 'fun',

	execute: async (message) => {
		const msgObj = message.message;
		if (!message.args[0]) {
			return msgObj.channel.send(replies.mention);
		}
		const tohack = msgObj.mentions.members.first();
		const msg = await msgObj.channel.send(`Hacking ${tohack.displayName}....`);

		setTimeout(function() {
			msg.edit(`Finding ${tohack.displayName}'s Email and Password.....`);
		}, 1000);

		setTimeout(function() {
			msg.edit(`E-Mail: ${tohack.displayName}@gmail.com \nPassword: ********`);
		}, 9000);

		setTimeout(function() {
			msg.edit('Finding Other Accounts.....');
		}, 15000);


		setTimeout(function() {
			msg.edit('Setting up Epic Games Account.....');
		}, 21000);


		setTimeout(function() {
			msg.edit('Hacking Epic Games Account......');
		}, 26000);


		setTimeout(function() {
			msg.edit('Hacked Epic Games Account!!');
		}, 31000);


		setTimeout(function() {
			msg.edit('Collecting Info.....');
		}, 35000);


		setTimeout(function() {
			msg.edit('Selling data to FBI....');
		}, 38000);


		setTimeout(function() {
			msg.edit(`Finished Hacking ${tohack.displayName}`);
		}, 40000);

	},
};
