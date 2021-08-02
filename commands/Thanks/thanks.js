const thanksSchema = require('../../schemas/thanks-schema.js');

module.exports = {
	name: 'thanks',
	aliases: ['thx', 'thnx'],
	description: 'Thanks a user',
	category: 'Thanks',
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: "<@user you want to thank>",

	run: async (message) => {

		const target = message.meantions.users.first();
		const targetId = target.id;
		const authorId = message.author.id;
		const guildId = guild.id;
		const now = new Date();
		const { guild } = message;

		if (targetId === authorId) {
			return message.reply('You can\'t thank yourself.');
		}

		const authorData = await thanksSchema.findOne({
			userId: authorId,
			guildId: guildId,
		});

		if (authorData && authorData.lastGave) {

			const then = new Date(authorData.lastGave);
			const diff = now.getTime() - then.getTime();
			const diffHours = Math.round(diff / (1000 * 60 * 60));
			const hours = 12;

			if (diffHours <= hours) {
				return message.reply(`You can only thank someone once every ${hours} hours.`);
			}
		}

		// Update the "lastGave" property for the command sender
		await thanksSchema.findOneAndUpdate({
			userId: authorId,
			guildId: guildId,
		},
		{
			userId: authorId,
			guildId: guildId,
			lastGave: now,
		},
		{
			upsert: true,
		});

		// Inncrease how many thanks the taget user has had.

		const result = await thanksSchema.findOneAndUpdate({
			userId: targetId,
			guildId: guildId,
		},
		{
			userId: targetId,
			guildId: guildId,
			$inc: {
				received: 1,
			},
		},
		{
			upsert: true,
			new: true,
		});

		const amount = result.received;

		message.reply(`You have thanked <@${targetId}>! They now have ${amount} thanks.`);

	},
};