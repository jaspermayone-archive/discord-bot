/* eslint-disable no-unused-vars */
const { MessageEmbed } = require('discord.js');
const { colors, cdn } = require('../../config.json');
const pjson = require('../../package.json');

module.exports = {
  name: 'cat',
  category: 'Fun',
  description: 'Sends a random image of a cat',
  minArgs: 0,
  maxArgs: 0,
  expectedArgs: '',
  cooldown: '1m',

  callback: async ({ message }) => {
    message.channel.send(`Curently disabled due to API switchover`);
    /* 		const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());

		const catembed = new MessageEmbed()
			.setTitle('Random cat')
			.setImage(file)
			.setColor(colors.heptagram)
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot || ${pjson.version}", `${cdn.sqlogo}`);

		message.reply({ embeds: [catembed] }); */
  },
};
