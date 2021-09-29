const { MessageEmbed } = require('discord.js');
const { colors, cdn, emoji } = require('../../config.json');
const pjson = require('../../package.json');

module.exports = {
  name: 'ban',
  description: 'bans users',
  guildOnly: true,
  category: 'Moderation',
  minArgs: 2,
  maxArgs: -1,
  expectedArgs: '<@user you want to ban> <reason>',
  permissions: ['BAN_MEMBERS'],

  callback: async ({ message, args, client }) => {
    function getUserFromMention(mention) {
      if (!mention) return;

      if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
          mention = mention.slice(1);
        }

        return client.users.cache.get(mention);
      }
    }

    const user = getUserFromMention(args[0]);
    if (!user) {
      return message.reply(
        'Please use a proper mention if you want to ban someone.',
      );
    }

    const reason = args.slice(1).join(' ');

    const banembed = new MessageEmbed()
      .setColor(colors.heptagram)
      .setTitle(`:white_check_mark: **Success!** :white_check_mark:`)
      .setDescription(
        `Successfully banned **${user.tag}** from the server! || Reason: ${reason}.`,
      )
      .setTimestamp()
      .setFooter(
        `Message sent by the Heptagram Bot || ${pjson.version}`,
        `${cdn.sqlogo}`,
      );

    const errorembed = new MessageEmbed()
      .setColor(colors.heptagram)
      .setTitle(`${emoji.x} **Failed** ${emoji.x}`)
      .setDescription(`Failed to ban **${user.tag}**.`)
      .setTimestamp()
      .setFooter(
        `Message sent by the Heptagram Bot || ${pjson.version}`,
        `${cdn.sqlogo}`,
      );

    try {
      await message.guild.members.ban(user, { reason });
    } catch (error) {
      return message.reply({ embeds: [errorembed] });
    }

    return message.reply({ embeds: [banembed] });
  },
};
