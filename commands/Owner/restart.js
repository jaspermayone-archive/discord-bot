module.exports = {
	name: 'restart',
	aliases: ['r'],
	description: 'restarts bot.',
	category: 'Owner',
	ownerOnly: true,
	hidden: true,

	execute({ client }) {
		client.destroy();
		process.exit();
	},
};
