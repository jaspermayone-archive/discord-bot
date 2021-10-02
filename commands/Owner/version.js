const { MessageEmbed } = require('discord.js');
const { colors, cdn } = require('../../config.json');
const pjson = require('../../package.json');

module.exports = {
  name: 'version',
  aliases: ['v', 'versn'],
  description: 'Displays bot versions',
  category: 'Owner',
  ownerOnly: true,
  hidden: true,

  callback: async ({ message }) => {
    const embed = new MessageEmbed()
      .setColor(colors.heptagram)
      .setTitle(`Hey J-dogcoder! Here are my current versions.`)
      .addFields(
        {
          name: 'Node Version:',
          value: `${process.versions.node}`,
          inline: true,
        },
        { name: 'Bot Version:', value: `${pjson.version}`, inline: true },
      )
      .setTimestamp()
      .setFooter(
        `Message sent by the Heptagram Bot || ${pjson.version}`,
        `${cdn.sqlogo}`,
      );

    message.reply({ embeds: [embed] });
  },
};
