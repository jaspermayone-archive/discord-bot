const mongo = require('../../mongo');
const warnSchema = require('../../schemas/warn-schema');
const { MessageEmbed } = require('discord.js');
const { colors, cdn } = require('../../config.json');

module.exports = {
  name: 'listwarnings',
  description: 'Lists the warnings of a users',
  category: 'Moderation',
  minArgs: 1,
  maxArgs: 1,
  expectedArgs: "<Target user's @>",
  permissions: ['MANAGE_MESSAGES'],

  callback: async ({ message }) => {
    // Will display the list of all the warnings a user has
    // !listwarnings <mention the user>

    const target = message.mentions.users.first();
    if (!target) {
      message.reply('Please specify a user to load the warnings for.');
      return;
    }

    const guildId = message.guild.id;
    const userId = target.id;

    const listembed = new MessageEmbed()
      .setColor(colors.heptagram)
      .setTitle(`**List of Warnings!**`)
      .setTimestamp()
      .setFooter('Message sent by the Heptagram Bot', `${cdn.sqlogo}`);

    const msgembed = new MessageEmbed()
      .setColor(colors.heptagram)
      .setTitle(`**Note**`);

    await mongo().then(async (mongoose) => {
      try {
        const results = await warnSchema.findOne({
          guildId,
          userId,
        });

        // If user has no warnings:
        if (!results) {
          msgembed.setDescription(`User has no warnings!`);
          message.reply({ embeds: [msgembed] });
          return;
        }

        // If user has warnings, display them:
        let reply = `Previous warnings for <@${userId}>: \n\n`;

        for (const warning of results.warnings) {
          const { author, timestamp, reason } = warning;
          reply += `By ${author} on  ${new Date(
            timestamp,
          ).toLocaleDateString()} for --> **Reason: "${reason}**" \n\n `;
        }

        listembed.setDescription(`${reply}`);
        message.reply({ embeds: [listembed] });
      } finally {
        mongoose.connection.close();
      }
    });
  },
};
