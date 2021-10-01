const { colors, cdn } = require('../../config.json');
const { MessageEmbed } = require('discord.js');
const pjson = require('../../package.json');

module.exports = {
	name: 'eval',
	description: 'allows owner to run any js script through discord',
	category: 'Owner',
	minArgs: 1,
	ownerOnly: true,
	hidden: true,

	callback: async ({ message, args }) =>{

		if(!args[0]) return message.channel.send('Please provide a code to run.');

		try {
			let evaled = eval(args.join(' '));
			if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
			const embed = new MessageEmbed()
				.setColor(colors.heptagram)
				.setTitle('Eval')
				.setDescription(`\`\`\`js\n${evaled}\n\`\`\``)
				.setTimestamp()
				.setFooter(`Message sent by the Heptagram Bot || ${pjson.version}`, `${cdn.sqlogo}`);

			message.channel.send(embed);
		}
		catch (err) {
			const embed = new MessageEmbed()
				.setColor(colors.heptagram)
				.setTitle('Eval')
				.setDescription(`\`\`\`js\n${err}\n\`\`\``)
				.setTimestamp()
				.setFooter(`Message sent by the Heptagram Bot || ${pjson.version}`, `${cdn.sqlogo}`);
			message.channel.send(embed);
		}


	} };