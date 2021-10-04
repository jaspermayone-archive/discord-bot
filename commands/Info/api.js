const Discord = require('discord.js');
const { colors, cdn } = require('../../config.json');
const pjson = require('../../package.json');

module.exports = {
  name: 'api',
  aliases: ['API'],
  description: 'gives info about the Heptagram API',
  category: 'Info',
  minArgs: 0,
  maxArgs: 0,
  expectedArgs: '',
  cooldown: '1m',

  callback: ({ message }) => {
    const embed = new Discord.MessageEmbed()
      .setTitle('Heptagram API')
      .setColor(colors.heptagram)
      .setDescription(
        'The Heptagram bot relies on a first party api, developed to reduce external api reliances. Find more about it in the Heptagram server.',
      )
      .setTimestamp()
      .setFooter(
        `Message sent by the Heptagram Bot || ${pjson.version}`,
        `${cdn.sqlogo}`,
      );
    message.reply({ embeds: [embed] });
  },
};
