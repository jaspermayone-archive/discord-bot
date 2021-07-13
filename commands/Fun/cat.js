const { MessageEmbed } = require('discord.js');
const { colors } = require('../../config.json');

const fetch = require('node-fetch');

module.exports = {
	name: 'cat',
	category: 'fun',
	description: 'Sends a random image of a cat',
	guildOnly: false,

	async execute({ message }) {

		const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());

		const catembed = new MessageEmbed()
			.setTitle('Random cat')
			.setImage(file)
			.setColor(colors.heptagram)
			.setURL(file);
		message.channel.send(catembed);
	},
};