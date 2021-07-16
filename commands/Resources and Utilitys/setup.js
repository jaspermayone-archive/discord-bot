module.exports = {
	name: 'setup',
	description: 'configures bot for new server.',
	guildOnly: true,
	category: 'Utilitys',

	execute({ message }) {
		if (message.member.hasPermission('MANAGE_SERVER', 'MANAGE_CHANNELS')) {

			const guild = message.guild;

			message.channel.send('Setting Up the Bot!');

			guild.roles.create({
				data: {
					name: 'Admin (Bot Test)',
					color: 'RED',
				},
				reason: 'Needed to make Heptagram Work.',
			});

			guild.roles.create({
				data: {
					name: 'Users (Bot Test)',
					color: 'GREY',
				},
				reason: 'Needed to make Heptagram Work.',
			});

			guild.roles.create({
				data: {
					name: 'Muted (Bot Test)',
					color: 'BLACK',
				},
				reason: 'Needed to make Heptagram Work.',
			});
			message.channel.send('Roles Created,');


		}
		else {
			message.channel.send('This command sets up the server.');
		}
	},
};