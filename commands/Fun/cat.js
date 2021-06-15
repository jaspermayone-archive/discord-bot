const superagent = require('snekfetch');
const Discord = require('discord.js');

const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');


module.exports = {
	name: 'cat',
	category: 'fun',
	description: 'Sends a random image of a cat',
	guildOnly: false,

	execute({ message, client, args, roles }) {
		superagent.get('https://nekos.life/api/v2/img/meow')
			.end((err, response) => {
				const lewdembed = new Discord.MessageEmbed()
					.setTitle('Random cat')
					.setImage(response.body.url)
					.setColor(colors.heptagram)
					.setFooter('owo')
					.setURL(response.body.url);
				message.channel.send(lewdembed);
			});
	},
};