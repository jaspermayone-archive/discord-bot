const { colors, cdn } = require('../../config.json');
const { MessageEmbed } = require('discord.js');
const pjson = require('../../package.json');

module.exports = {
  name: 'status',
  description: 'changes bot status',
  category: 'Owner',
  ownerOnly: true,
  hidden: true,

  callback: async ({ client, message, prefix }) => {
    const content = message.content.replace(`${prefix}status`, '');

    await client.user
      .setPresence({
        activity: {
          name: content,
          type: 3,
        },
      })
      .then(() => {
        const embed = new MessageEmbed()
          .setColor(colors.heptagram)
          .setTitle(`:white_check_mark: **Success!** :white_check_mark:`)
          .setDescription(
            `You have succesfully changed the bot's status to **${content}**`,
          )
          .setTimestamp()
          .setFooter(
            `Message sent by the Heptagram Bot || ${pjson.version}`,
            `${cdn.sqlogo}`,
          );

        message.reply({ embeds: [embed] });
      });
  },
};
