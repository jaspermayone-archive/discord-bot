const Discord = require('discord.js');
const { colors, cdn } = require('../config.json');

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
    if (content.includes('https://discord.gg/')) {
      const isOurInvite = await isInvite(guild, code);

      if (!isOurInvite) {
        const nolinkembed = new Discord.MessageEmbed()
          .setColor(colors.heptagram)
          .setTitle('No invites here!')
          .setDescription("Sorry, invites aren't allowed here!")
          .setTimestamp()
          .setFooter('Message sent by the Heptagram Bot', `${cdn.sqlogo}`);

        await message.delete().then(() => {
          message.channel.send({ embeds: [nolinkembed] });
        });
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
