const { colors, cdn } = require('../../config.json');
const Discord = require('discord.js');
const pjson = require('../../package.json');

module.exports = {
  name: 'repo',
  aliases: ['opensource', 'os'],
  guildOnly: false,
  description: 'sends the bot repo link',
  category: 'Info',
  minArgs: 0,
  maxArgs: 0,
  expectedArgs: '',
  cooldown: '1m',

  callback: ({ message }) => {
    const embed = new Discord.MessageEmbed()
      .setTitle('Bot Repo :robot:')
      .setColor(colors.heptagram)
      .setDescription(
        'Heptagram is proud to be open source! You can find our GitHub repo at https://github.com/Heptagram-Bot/Heptagram',
      )
      .setTimestamp()
      .setFooter(
        `Message sent by the Heptagram Bot || ${pjson.version}`,
        `${cdn.sqlogo}`,
      );

    message.reply({ embeds: [embed] });
  },
};
