const { MessageEmbed } = require('discord.js');
const { colors, roles, cdn } = require('../../config.json');
const pjson = require('../../package.json');

const ms = require('ms');
module.exports = {
  name: 'mute',
  guildOnly: true,
  description: 'mutes user',
  category: 'Moderation',
  minArgs: 3,
  maxArgs: -1,
  expectedArgs: '<@user you want to mute> <time> <reason>',
  permissions: ['MUTE_MEMBERS'],

  callback: async ({ message, args }) => {
    const muteRoleId = message.guild.roles.cache.get(roles.muted);
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!member) {
      return message.channel.send(
        'Please mention a user or provide a valid user ID',
      );
    }
    if (member === message.member) {
      return message.channel.send('You cannot mute yourself');
    }
    if (member === message.guild.me) {
      return message.channel.send(message, 0, 'You cannot mute me');
    }
    if (
      member.roles.highest.position >= message.member.roles.highest.position
    ) {
      return message.channel.send(
        'You cannot mute someone with an equal or higher role',
      );
    }
    if (!args[1]) {
      return message.channel.send('Please enter a length of time. (1s/m/h/d)');
    }
    const time = ms(args[1]);

    let reason = args.slice(2).join(' ');
    if (!reason) reason = '`None Provided`';
    if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

    if (member.roles.cache.has(muteRoleId)) {
      return message.channel.send('Provided member is already muted');
    }

    try {
      await member.roles.add(muteRoleId);
    } catch (err) {
      console.log(err);
      return message.channel.send(
        'Please check the role hierarchy',
        err.message,
      );
    }
    const muteEmbed = new MessageEmbed()
      .setTitle('Mute Member')
      .setDescription(
        `${member} has now been muted for **${ms(time, { long: true })}**.`,
      )
      .addField('Moderator', message.member, true)
      .addField('Member', member, true)
      .addField('Time', `\`${ms(time)}\``, true)
      .addField('Reason', reason)
      .setFooter(
        `Message sent by the Heptagram Bot || ${pjson.version}`,
        `${cdn.sqlogo}`,
      )
      .setTimestamp()
      .setColor(colors.heptagram);

    message.reply({ embeds: [muteEmbed] });
    return;
  },
};
