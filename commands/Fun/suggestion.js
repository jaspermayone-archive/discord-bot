const { MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js');
const { colors, cdn } = require('../../config.json');
const pjson = require('../../package.json');

module.exports = {
  name: 'suggestion',
  description: 'users can give suggestions',
  guildOnly: true,
  category: 'Fun',
  minArgs: 2,
  maxArgs: -1,
  expectedArgs:
    'suggest <suggestion> \n !suggestion accept <suggestionID> <reason> \n !suggestion decline <suggestionID> <reason>',

  callback: async ({ message, args, client }) => {
    // ------Command Usage:----------
    // 1. FOR NORMAL USERS:
    //    !suggestion suggest <give-your-suggestion>
    // 2. FOR ADMINISTRATORS (TO ACCEPT/DECLINE)
    //    i) !suggestion accept <reason-for-accepting>
    //   ii) !suggestion decline <reason-for-decline>

    const msgembed = new MessageEmbed()
      .setTitle(`**NOTE**`)
      .setColor(colors.heptagram)
      .setFooter(
        `Message sent by the Heptagram Bot || ${pjson.version}`,
        `${cdn.sqlogo}`,
      );

    const command = args[0];

    const sendChannel = message.guild.channels.cache.find(
      (c) => c.name === 'suggestions',
    );
    if (!sendChannel) {
      await message.channel.send({
        embeds: [msgembed.setDescription(`Suggestions channel does not exist.`)],
      });
      return;
    }

    // !suggestions suggest <give-your-suggestion>
    if (command === 'suggest') {
      args.shift();
      const msg = args.join(' ');

      const embed = new MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true }),
        )
        .setDescription(`**Suggestion**: ${msg}`)
        .setColor('ORANGE')
        .addField('Status: ', 'PENDING')
        .setTimestamp();

      const embed1 = embed;
      await message.reply({
        embeds: [
          msgembed.setDescription(
            `Your suggestion has been sent. Please check the ${sendChannel} channel`,
          ),
        ],
      });

      await sendChannel.send({ embeds: [embed1] }).then((embedMessage) => {
        embedMessage.react('👍');
        embedMessage.react('👎');
      });
    }
    // !suggestions accept <suggestionID> <reason>
    else if (command === 'accept') {
      if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
        await message.channel.send({
          embeds: [msgembed.setDescription(`You are not an administrator! `)],
        });
        return;
      }
      const messageID = args[1];
      const acceptQuery = args.slice(2).join(' ');

      // Error catching
      if (!messageID) {
        await message.reply({
          embeds: [msgembed.setDescription(`'Please specify the message ID!`)],
        });
        return;
      }
      if (!acceptQuery) {
        await message.reply({
          embeds: [msgembed.setDescription(`Please specify an Accept Query!`)],
        });
        return;
      }
      try {
        await sendChannel.messages.fetch(messageID);
      } catch (error) {
        await message.channel.send({
          embeds: [msgembed.setDescription(`Incorrect ID Provided!`)],
        });
        return;
      }

      try {
        const suggestEmbed = await sendChannel.messages.fetch(messageID);

        const data = suggestEmbed.embeds[0];

        const acceptEmbed = new MessageEmbed()
          .setAuthor(data.author.name, data.author.iconURL)
          .setDescription(`${data.description}`)
          .setColor('GREEN')
          .addField('Status: ', 'ACCEPTED')
          .addField('Reason: ', acceptQuery)
          .setTimestamp();

        suggestEmbed.edit({ embeds: [acceptEmbed] });

        await message.delete();

        const user = await client.users.cache.find(
          (u) => u.tag === data.author.name,
        );
        await user.send({
          embeds: [
            msgembed.setDescription(
              `Your suggestion to : "${data.description}" has been accepted!`,
            ),
          ],
        });
      } catch (error) {
        await message.channel.send({
          embeds: [
            msgembed.setDescription(
              `Encountered an error. Please share with the development team!`,
            ),
          ],
        });
      }
    }
    // !suggestions decline <suggestionID> <reason>
    else if (command === 'decline') {
      if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
        await message.channel.send({
          embeds: [
            msgembed.setDescription(`You don't have the required permissions!`),
          ],
        });
        return;
      }
      const messageID = args[1];
      const declineQuery = args.slice(2).join(' ');

      // Error catching
      if (!messageID) {
        await message.reply({
          embeds: [msgembed.setDescription(`Please specify the message ID!`)],
        });
        return;
      }
      if (!declineQuery) {
        await message.reply({
          embeds: [msgembed.setDescription(`Please specify an Accept Query!`)],
        });
        return;
      }
      try {
        await sendChannel.messages.fetch(messageID);
      } catch (error) {
        await message.channel.send({
          embeds: [msgembed.setDescription(`Incorrect ID Provided!`)],
        });
        return;
      }

      try {
        const suggestEmbed = await sendChannel.messages.fetch(messageID);

        const data = suggestEmbed.embeds[0];

        const declineEmbed = new MessageEmbed()
          .setAuthor(data.author.name, data.author.iconURL)
          .setDescription(`${data.description}`)
          .setColor('RED')
          .addField('Status: ', 'DECLINED')
          .addField('Reason: ', declineQuery)
          .setTimestamp();

        suggestEmbed.edit({ embeds: [declineEmbed] });

        await message.delete();

        const user = await client.users.cache.find(
          (u) => u.tag === data.author.name,
        );
        await user.send({
          embeds: [
            msgembed.setDescription(
              `Your suggestion to: "${data.description}" has been declined!`,
            ),
          ],
        });
      } catch (error) {
        await message.channel.send({
          embeds: [
            msgembed.setDescription(
              `Encountered an error. Please share with the development team!`,
            ),
          ],
        });
        return;
      }
    } else {
      await message.channel.send({
        embeds: [msgembed.setDescription(`Invalid command usage!`)],
      });
    }
  },
};
