/* eslint-disable no-shadow */
const { MessageEmbed } = require('discord.js');
// / const { arg } = require('mathjs');
const mongo = require('../../mongo');
const warnSchema = require('../../schemas/warn-schema');
const pjson = require('../../package.json');
const { colors, cdn, emoji } = require('../../config.json');

module.exports = {
  name: 'warn',
  description: 'warns users',
  category: 'Moderation',
  minArgs: 2,
  maxArgs: -1,
  expectedArgs: "<Target user's @> <reason>",
  permissions: ['MANAGE_MESSAGES'],

  callback: async ({ message, args, target }) => {
    // 'warn' command is called automatically from the anti-link or anti-ad features file
    let auto = true;

    if (!target) {
      target =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);

      // i.e. Warn command is called manually by a moderator
      auto = false;
    }
    if (!target) {
      // message.reply('Please specify someone to warn.')
      await message.channel.send('Please specify someone to warn.');
      return;
    }

    args.shift();

    const guildId = message.guild.id;
    const userId = target.id;
    const reason = args.join(' ');

    const warning = {
      author: message.member.user.tag,
      timestamp: new Date().getTime(),
      reason,
    };
    if (auto === true) {
      // If called automatically form anti-link/ad files, then set the bot as the author of warning
      warning.author = 'Heptagram Bot';
    }

    // Embeds:
    const warnembed = new MessageEmbed()
      .setColor(colors.heptagram)
      .setTitle(`:white_check_mark: **Success!** :white_check_mark:`)
      .setDescription(`Warned **${message.author}**! || Reason: ${reason}.`)
      .setTimestamp()
      .setFooter('Message sent by the Heptagram Bot', `${cdn.sqlogo}`);

    const kickembed = new MessageEmbed()
      .setColor(colors.heptagram)
      .setTitle(`:white_check_mark: **Success!** :white_check_mark:`)
      .setDescription(
        `Successfully kicked **${message.author}** from the server! || Reason: Kicked for reaching maximum warnings.`,
      )
      .setTimestamp()
      .setFooter(
        `Message sent by the Heptagram Bot || ${pjson.version}`,
        `${cdn.sqlogo}`,
      );

    const banembed = new MessageEmbed()
      .setColor(colors.heptagram)
      .setTitle(`:white_check_mark: **Success!** :white_check_mark:`)
      .setDescription(
        `Successfully banned **${message.author}** from the server! || Reason: Banned for reaching maximum warnings.`,
      )
      .setTimestamp()
      .setFooter(
        `Message sent by the Heptagram Bot || ${pjson.version}`,
        `${cdn.sqlogo}`,
      );

    const errorembed = new MessageEmbed()
      .setColor(colors.heptagram)
      .setTitle(`${emoji.x} **Error** ${emoji.x}`)
      .setDescription(`Encountered an error. Pls report the error to the team`)
      .setTimestamp()
      .setFooter(
        `Message sent by the Heptagram Bot || ${pjson.version}`,
        `${cdn.sqlogo}`,
      );

    const msgembed = new MessageEmbed()
      .setColor(colors.heptagram)
      .setTitle(`**Note**`);

    // Fetch and update database:
    await mongo().then(async (mongoose) => {
      try {
        await warnSchema.findOneAndUpdate(
          {
            guildId,
            userId,
          },
          {
            guildId,
            userId,
            $push: {
              warnings: warning,
            },
          },
          {
            upsert: true,
          },
        );

        // For checking the maximum warnings and to ban if max warnings are reached
        const results = await warnSchema.findOne({
          guildId,
          userId,
        });

        // Ban or kick the user
        if (results.warnings.length >= results.maxWarnings) {
          try {
            if (results.action === 'ban') {
              msgembed.setDescription(`Banned for reaching maximum warnings`);
              await target.send({ embeds: [msgembed] });
              const reason = `Banned for reaching maximum warnings`;
              await message.guild.members.ban(target, { reason });
              await message.channel.send({ embeds: [banembed] });
              // await message.reply(`${target} banned for reaching max warnings`)
              return;
            } else if (results.action === 'kick') {
              msgembed.setDescription(`Kicked for reaching maximum warnings`);
              await target.send({ embeds: [msgembed] });
              const reason = `Kicked for reaching maximum warnings`;
              await message.guild.members.kick(target, { reason });
              await message.channel.send({ embeds: [kickembed] });
              // await message.reply(`${target} kicked for reaching max warnings`)
              return;
            }
          } catch (error) {
            console.log(error);
            return message.channel.send({ embeds: [errorembed] });
            // return message.reply(`Error`)
          }
        }
      } finally {
        mongoose.connection.close();
      }
    });

    await message.channel.send({ embeds: [warnembed] });
    return;
  },
};
