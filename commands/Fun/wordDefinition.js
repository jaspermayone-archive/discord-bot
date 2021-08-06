const fetch = require('node-fetch');

const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en_US';

module.exports = {
	name: 'word',
	cooldown: '1m',
	description: 'Shows word definitions',
	category: 'Fun',
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: "<word>",

	execute: async (message, args) => {
		const word = args[0].toLowerCase();

		const response = await fetch(`${API_URL}/${word}`);
		const data = await response.json();

		if (data.title === 'No Definitions Found') {
			return message.channel.send(
				`❌ | I couldn't get the definition of that word!`
			);
		}

		const { meanings } = data[0];
		const { definition } = meanings[0].definitions[0];
		const { partOfSpeech } = meanings[0];
		
		const speech =
			partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.slice(1);

		const embed = new MessageEmbed()
			.setColor('#75ff6e')
			.setTitle('✅ | Word definition')
			.setDescription(
				`**» Word**: ${word}\n**» Speech**: ${speech}\n**» Definition**: ${definition}`
			)
			.setFooter(
				`Requested by ${message.author.tag}`,
				message.author.displayAvatarURL({ size: 4096, dynamic: true })
			);

		message.channel.send(embed);
	},
};
