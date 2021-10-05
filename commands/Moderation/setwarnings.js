const mongo = require('../../mongo');
const warnSchema = require('../../schemas/warn-schema');

module.exports = {
  name: 'setwarnings',
  description: 'Settings for when max warning is reached',
  category: 'Moderation',
  minArgs: 2,
  maxArgs: 2,
  expectedArgs: '<max no of warnings> <action(kick/ban)>',
  permissions: ['MANAGE_MESSAGES'],

  callback: async ({ message, args }) => {
    const noOfWarnings = parseInt(args[0]);
    const action = args[1];

    if (isNaN(noOfWarnings)) {
      return message.reply('No of warnings should be an integer.');
    }
    if (noOfWarnings < 1) {
      return message.reply('No of warnings should be more than one.');
    }
    if (!action === 'kick' || !action === 'ban') {
      return message.reply("Action must be 'kick' or 'ban'.");
    }

    const guildId = message.guild.id;

    await mongo().then(async (mongoose) => {
      try {
        await warnSchema.updateMany(
          { guildId },
          { $set: { maxWarnings: noOfWarnings, action: action } },
        );
      } finally {
        mongoose.connection.close();
      }
    });
  },
};
