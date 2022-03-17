const Discord = require('discord.js');
const { colors } = require('../config/config.json');
const pjson = require('../../package.json');
const moment = require('moment');

exports.run = async (client, message, args, level) => {
    const roles = message.guild.roles.cache
    .sort((a, b) => b.position - a.position)
    .map((role) => role.toString());
  const members = message.guild.members.cache;
  const channels = message.guild.channels.cache;
  const emojis = message.guild.emojis.cache;

  const owner = await message.guild.fetchOwner();

  const generalEmbed = new Discord.MessageEmbed()
    .setColor(client.config.colors.heptagram)
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
.setFooter({
      text: `Message sent by Heptagram || ${pjson.version}`,
      iconURL: `${client.config.cdn.sqlogo}`,
    });

  message.reply({ embeds: [generalEmbed] });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "serverinfo",
  category: "Utilities",
  description: "gives info about server.",
  usage: "serverinfo"
};

