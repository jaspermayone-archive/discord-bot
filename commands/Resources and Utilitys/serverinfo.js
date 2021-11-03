const moment = require('moment');
const Discord = require('discord.js');
const { colors, cdn } = require('../../config.json');
const pjson = require('../../package.json');

module.exports = {
  name: 'serverinfo',
  description: 'gives info about server.',
  guildOnly: true,
  category: 'Resources',
  minArgs: 0,
  maxArgs: 0,
  expectedArgs: '',
  cooldown: '1m',

  callback: async ({ message }) => {
    const roles = message.guild.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => role.toString());
    const members = message.guild.members.cache;
    const channels = message.guild.channels.cache;
    const emojis = message.guild.emojis.cache;

    const owner = await message.guild.fetchOwner();

    const generalEmbed = new Discord.MessageEmbed()
      .setColor(colors.heptagram)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .addFields([
        { name: '**Name:**', value: `${message.guild.name}`, inline: true },
        { name: '**Guild ID:**', value: `${message.guild.id}`, inline: true },
        { name: '**Owner:**', value: `${owner} (${owner.id})`, inline: true },
        {
          name: '**Boost Tier:**',
          value: `${
            message.guild.premiumTier
              ? `Tier ${message.guild.premiumTier}`
              : 'None'
          }`,
          inline: true,
        },
        {
          name: '**Time Created:**',
          value: `${moment(message.guild.createdTimestamp).format(
            'LT',
          )} ${moment(message.guild.createdTimestamp).format('LL')} [${moment(
            message.guild.createdTimestamp,
          ).fromNow()}]`,
          inline: true,
        },
      ])
      .addFields([
        { name: '**Role Count:**', value: `${roles.length}`, inline: true },
        { name: '**Emoji Count:**', value: `${emojis.size}`, inline: true },
        {
          name: '**Humans:**',
          value: `${members.filter((member) => !member.user.bot).size}`,
          inline: true,
        },
        {
          name: '**Bots:**',
          value: `${members.filter((member) => member.user.bot).size}`,
          inline: true,
        },
        {
          name: '**Text Channels:**',
          value: `${
            channels.filter((channel) => channel.type === 'text').size
          }`,
          inline: true,
        },
        {
          name: '**Voice Channels:**',
          value: `${
            channels.filter((channel) => channel.type === 'voice').size
          }`,
          inline: true,
        },
      ])
      .setTimestamp()
      .setFooter(
        `Message sent by the Heptagram Bot || ${pjson.version}`,
        `${cdn.sqlogo}`,
      );

    message.reply({ embeds: [generalEmbed] });
  },
};
