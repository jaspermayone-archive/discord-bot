const Discord = require('discord.js');
const { colors, cdn } = require('../../config.json');
const pjson = require('../../package.json');

module.exports = {
  name: 'avatar',
  description: 'gets user avatar.',
  category: 'Utilitys',
  minArgs: 0,
  maxArgs: 0,
  expectedArgs: '',
  cooldown: '1m',

  callback: async ({ message, args }) => {
    if (!args[0]) {
      const embed1 = new Discord.MessageEmbed()
        .setAuthor(
          `${message.member.user.tag}`,
          `${message.author.displayAvatarURL()}`,
        )
        .setColor(colors.heptagram)
        .setTitle('**Avatar**')
        .setImage(
          `${message.author.displayAvatarURL({ size: 4096, dynamic: true })}`,
        )
        .setTimestamp()
        .setFooter(
          `Message sent by the Heptagram Bot || ${pjson.version}`,
          `${cdn.sqlogo}`,
        );

      return message.reply({ embeds: [embed1] });
    } else {
      const member =
        message.mentions.users.first() ||
        (await message.guild.members.fetch(args[0]).catch(() => {
          return undefined;
        }));
      if (!member) {
        return message.reply('User not found.');
      } else {
        const embed2 = new Discord.MessageEmbed()
          .setAuthor(`${member.user.tag}`, `${member.user.displayAvatarURL()}`)
          .setColor(colors.heptagram)
          .setTitle('Requested Avatar:')
          .setImage(
            `${member.user.displayAvatarURL({ size: 4096, dynamic: true })}`,
          )
          .setTimestamp()
          .setFooter(
            `Message sent by the Heptagram Bot || ${pjson.version}`,
            `${cdn.sqlogo}`,
          );

        return message.reply({ embeds: [embed2] });
      }
    }
  },
};
