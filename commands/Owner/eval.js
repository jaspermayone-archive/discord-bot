const {MessageEmbed} = require('discord.js');
module.exports = {
	name: 'eval',
	description: 'allows owner to run any js script through discord',
	category: 'Owner',
	minArgs: 1,
	ownerOnly: true,
	hidden: true,

	callback: async ({ client, message, args }) =>{

		if(!args[0]) return message.channel.send('Please provide a code to run.');

		try {
			let evaled = eval(args.join(' '));
			if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
			const embed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle('Eval')
				.setDescription(`\`\`\`js\n${evaled}\n\`\`\``)
				.setTimestamp();
			message.channel.send(embed);
		} catch (err) {
			const embed = new MessageEmbed()
				.setColor('#ff0000')
				.setTitle('Eval')
				.setDescription(`\`\`\`js\n${err}\n\`\`\``)
				.setTimestamp();
			message.channel.send(embed);
		}


	}}