const Discord = require('discord.js');
const { colors, cdn } = require('../config.json');
const warn = require('../commands/Moderation/warn');

module.exports = (client) => {
  const isInvite = async (guild, code) => {
    return await new Promise((resolve) => {
      guild.invites.fetch().then((invites) => {
        for (const invite of invites) {
          if (code === invite[0]) {
            resolve(true);
            return;
          }
        }
        resolve(false);
      });
    });
  };

  client.on('messageCreate', async (message) => {
    const { guild, content } = message;

    const code = content.split('discord.gg/')[1];

    // check to see if message contains a discord invite link
    if (content.includes('discord.gg/')) {
      const isOurInvite = await isInvite(guild, code);

      if (!message.author.bot && !isOurInvite) {
        const nolinkembed = new Discord.MessageEmbed()
          .setColor(colors.heptagram)
          .setTitle('No invites here!')
          .setDescription("Sorry, invites aren't allowed here!")
          .setTimestamp()
          .setFooter('Message sent by the Heptagram Bot', `${cdn.sqlogo}`);

        await message.delete().then(() => {
          message.channel.send({ embeds: [nolinkembed] });
        });

        // To warn the user if an invite is sent
        try {
          const argsAssign = [`${message.author}`, `Invites not allowed`];

          message.content = `!warn ${message.author} Invites not allowed`;
          await warn.callback({
            message: message,
            args: argsAssign,
            target: message.author,
          });
          return;
        } catch (error) {
          console.log(error);
          message.channel.send('Error !');
          return;
        }
      } else {
      }
    } else {
    }
  });
};

module.exports.config = {
  displayName: 'Anti Invite',
  dbName: 'ANTI INVITE',
};
