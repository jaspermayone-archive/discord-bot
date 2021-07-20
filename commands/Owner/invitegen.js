module.exports = {
	name: 'invitegen',
	aliases: ['gen', 'generate', 'gi'],
	description: 'generates invite for owner to use inn debuging.',
	category: 'Owner',
	ownerOnly: true,
	hidden: true,

	execute({ client, message, args }) {
        client.guild.invite.c
        //	console.log(args);
	},
};
