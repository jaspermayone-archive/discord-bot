const { MessageEmbed } = require('discord.js');
const { colors } = require('../../config.json');

const fetch = require('node-fetch');

module.exports = {
	name: 'cat',
	category: 'fun',
	description: 'Sends a random image of a cat',

	async execute({ message }) {

		const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());

		const catembed = new MessageEmbed()
			.setTitle('Random cat')
			.setImage(file)
			.setColor(colors.heptagram)
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", 'https://cdn.heptagram.xyz/Logos/HeptagramLogo%28square%29.png');

		message.channel.send(catembed);
	},
};