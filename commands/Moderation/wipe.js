const { MessageEmbed } = require('discord.js');
const { colors, cdn } = require('../../config.json');
const pjson = require('../../package.json');

module.exports = {
  name: 'wipe',
  description: 'clear with bigger options',
  category: 'Moderation',
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: '<number of messgaes you want to clear>',
  permissions: ['MANAGE_MESSAGES'],

  callback: async ({ message, args, prefix }) => {
    const numberinsttext = new MessageEmbed()
      .setColor(colors.heptagram)
      .setTitle(`Incorect Usage!`)
      .setDescription('Please enter a number instead of text.')
      .setTimestamp()
      .setFooter(
        `Message sent by the Heptagram Bot || ${pjson.version}`,
        `${cdn.sqlogo}`,
      );

    const slowdown = new MessageEmbed()
      .setColor(colors.heptagram)
      .setTitle(`Slow Down!`)
      .setDescription(
        'This command resticts to 100 messages per command for safety.',
      )
      .setTimestamp()
      .setFooter(
        `Message sent by the Heptagram Bot || ${pjson.version}`,
        `${cdn.sqlogo}`,
      );

    const elevenmsgs = new MessageEmbed()
      .setColor(colors.heptagram)
      .setTitle(`Not enough messages.`)
      .setDescription(
        `You must delete at least 11 messages. Please use ${prefix}clear for smaller jobs.`,
      )
      .setTimestamp()
      .setFooter(
        `Message sent by the Heptagram Bot || ${pjson.version}`,
        `${cdn.sqlogo}`,
      );

    if (isNaN(args[0])) return message.reply({ embeds: [numberinsttext] });

    if (args[0] > 100) return message.reply({ embeds: [slowdown] });
    if (args[0] < 11) return message.reply({ embeds: [elevenmsgs] });

    await message.channel.messages
      .fetch({ limit: args[0] })
      .then((messages) => {
        message.channel.bulkDelete(messages);
      })
      .finally(() => {
        const embed = new MessageEmbed()
          .setColor(colors.heptagram)
          .setTitle(`:white_check_mark: **Success!** :white_check_mark:`)
          .setDescription(`You have succesfully wiped ${args[0]} messages.`)
          .addFields({
            name: '**PLEASE NOTE:**',
            value:
              'This will only delete messages that are under 14 days old. ',
            inline: true,
          })
          .setTimestamp()
          .setFooter(
            `Message sent by the Heptagram Bot || ${pjson.version}`,
            `${cdn.sqlogo}`,
          );

        message.reply({ embeds: [embed] });
      });
  },
};
