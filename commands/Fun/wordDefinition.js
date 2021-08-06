const fetch = require('node-fetch');

const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries';

module.exports = {
	name: 'word',
	cooldown: '1m',
	description: 'Shows word definitions',
	category: 'Fun',
	minArgs: 2,
	maxArgs: 2,
	expectedArgs: "<word> <lang code>",

	execute: async (message, args) => {
		const AVAILABLE_LANGUAGES = [
			'en_US',
			'hi',
			'es',
			'fr',
			'ja',
			'ru',
			'en_GB',
			'de',
			'it',
			'ko',
			'pt-BR',
			'ar',
			'tr',
		];
		const word = args[0].toLowerCase();
		const lang = args[1];

		if (!AVAILABLE_LANGUAGES.includes(lang)) {
			return message.channel.send(
				`❌ | Language not available.\n\nUse one of the following: \n${AVAILABLE_LANGUAGES.map(
					(language) => `\`${language}\``
				).join(' ')}`
			);
		}

		const response = await fetch(`${API_URL}/${lang}/${word}`);
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
