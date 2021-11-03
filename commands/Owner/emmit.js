const { colors, cdn } = require('../../config.json');
const { MessageEmbed } = require('discord.js');
const pjson = require('../../package.json');

module.exports = {
  name: 'emmit',
  aliases: ['ej', 'emit', 'e'],
  description: 'pretends a new user has joined (for testing only)',
  category: 'Owner',
  ownerOnly: true,
  hidden: true,

  callback: async ({ client, message, args }) => {
    if (args[0] === 'join') {
      client.emit('guildMemberAdd', message.member);

      const jembed = new MessageEmbed()
        .setColor(colors.heptagram)
        .setTitle(`Join Emmitted!`)
        .setDescription(
          `You have succesfully emmited a join. || <@${message.author.id}>`,
        )
        .setTimestamp()
        .setFooter(
          `Message sent by the Heptagram Bot || ${pjson.version}`,
          `${cdn.sqlogo}`,
        );

      return message.reply({ embeds: [jembed] });
    }

    if (args[0] === 'leave') {
      client.emit('guildMemberLeave', message.member);

      const lembed = new MessageEmbed()
        .setColor(colors.heptagram)
        .setTitle(`Leave Emmitted!`)
        .setDescription(
          `You have succesfully emmited a leave. || <@${message.author.id}>`,
        )
        .setTimestamp()
        .setFooter(
          `Message sent by the Heptagram Bot || ${pjson.version}`,
          `${cdn.sqlogo}`,
        );

      return message.reply({ embeds: [lembed] });
    }
  },
};
