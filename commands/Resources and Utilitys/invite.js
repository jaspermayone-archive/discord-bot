const Discord = require('discord.js');
const { colors, cdn } = require('../../config.json');
const pjson = require('../../package.json');

module.exports = {
  name: 'invite',
  description: 'sends the bot invite link',
  category: 'Resources',
  minArgs: 0,
  maxArgs: 0,
  expectedArgs: '',
  cooldown: '1m',

  callback: ({ message }) => {
    const embed = new Discord.MessageEmbed()
      .setTitle('Bot Invite :robot:')
      .setColor(colors.heptagram)
      .setDescription(
        `You can invite Heptagram to your server [here](https://discord.com/oauth2/authorize?client_id=783073095036043274&permissions=122682682614&scope=bot%20messages.read%20applications.commands).`,
      )
      .setTimestamp()
      .setFooter(
        `Message sent by the Heptagram Bot || ${pjson.version}`,
        `${cdn.sqlogo}`,
      );

    message.reply({ embeds: [embed] });
  },
};
