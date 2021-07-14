const mongo = require('../../mongo');
const prefixSchema = require('../../schemas/prefix-schema');

module.exports = {
	name: 'prefix',
	description: 'configures the bot prefix for server.',
	guildOnly: true,
	category: 'Utilitys',

	async execute({ message }) {
		const { member, channel, content, guild } = message;

		if (!member.hasPermission('ADMINISTRATOR')) {
			channel.send('You do not have permission to change this servers prefix.');
			return;
		}

		let text = content;

		const split = text.split(' ');

		if (split.length < 2) {
			channel.send('Please specify the new prefix.');
			return;
		}

		split.shift();

		text = split.join(' ');

		await mongo().then(async (mongoose) => {
			try {
				await prefixSchema.findOneAndUpdate({
					_id: guild.id,
				}, {
					_id: guild.id,
					prefix: text,
				}, {
					upsert: true,
				});
				message.reply('This command is curently broken.');
				//   message.reply(`The prefix for this server is now *${text}*`);
			}
			finally {
				mongoose.connection.close();
			}
		});
	},
};