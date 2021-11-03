const { MessageEmbed } = require('discord.js');
const { colors, cdn } = require('../../config.json');
const pjson = require('../../package.json');

module.exports = {
  name: 'diceroll',
  category: 'Fun',
  description: 'Rolls a dice for a number 1-6.',
  minArgs: 0,
  maxArgs: 0,
  expectedArgs: '',
  cooldown: '1m',

  callback({ message }) {
    const embed = new MessageEmbed()
      .setColor(colors.heptagram)
      .setTitle('A dice was rolled..')
      .setTimestamp()
      .setFooter(
        `Message sent by the Heptagram Bot || ${pjson.version}`,
        `${cdn.sqlogo}`,
      );

    const number = Math.floor(Math.random() * 6);
    const images = [
      'https://upload.wikimedia.org/wikipedia/commons/2/2c/Alea_1.png',
      'https://upload.wikimedia.org/wikipedia/commons/b/b8/Alea_2.png',
      'https://upload.wikimedia.org/wikipedia/commons/2/2f/Alea_3.png',
      'https://upload.wikimedia.org/wikipedia/commons/8/8d/Alea_4.png',
      'https://upload.wikimedia.org/wikipedia/commons/5/55/Alea_5.png',
      'https://upload.wikimedia.org/wikipedia/commons/f/f4/Alea_6.png',
    ];

    embed.setImage(images[number]);

    message.reply({ embeds: [embed] });
  },
};
