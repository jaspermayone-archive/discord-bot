const { colors, cdn } = require('../../config.json');
const { MessageEmbed } = require('discord.js');
const pjson = require('../../package.json');

module.exports = {
  name: 'restart',
  aliases: ['r', 're'],
  description: 'restarts bot.',
  category: 'Owner',
  ownerOnly: true,
  hidden: true,

  callback: async ({ client, message }) => {
    const embed = new MessageEmbed()
      .setColor(colors.heptagram)
      .setTitle(
        `<:status_offline:852483939955769375> **Bot Restarting!** <:status_offline:852483939955769375>`,
      )
      .setDescription(`The bot has been qued to restart.`)
      .setTimestamp()
      .setFooter(
        `Message sent by the Heptagram Bot || ${pjson.version}`,
        `${cdn.sqlogo}`,
      );

    await message.reply({ embeds: [embed] }).then(() => {
      client.destroy();
      process.exit();
    });
  },
};
