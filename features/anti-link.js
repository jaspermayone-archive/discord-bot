const { colors, cdn } = require('../config.json');
const warn = require('../commands/Moderation/warn');
const { MessageEmbed } = require('discord.js');

module.exports = (client) => {
  client.on('messageCreate', async (message) => {
    // const linkRegex =
    //  /(([a-z]+:\/\/)?((aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|xyz|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-.~]+)*(\/([a-z0-9_\-.]*)(\?[a-z0-9+_\-.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;

    const domains = [
      '.ac',
      '.aero',
      '.arpa',
      '.biz',
      '.co',
      '.com',
      '.coop',
      '.edu',
      '.gov',
      '.info',
      '.int',
      '.jobs',
      '.mil',
      '.museum',
      '.name',
      '.nato',
      '.net',
      '.org',
      '.pro',
      '.travel',
      '.xyz',
      '.local',
      '.internal',
    ];

    const nolinkembed = new MessageEmbed()
      .setColor(colors.heptagram)
      .setTitle('No links here!')
      .setDescription("Sorry, links aren't allowed here!")
      .setTimestamp()
      .setFooter('Message sent by the Heptagram Bot', `${cdn.sqlogo}`);

    let link = false;

    // FOR links which start with http
    if (
      message.content.includes('https://') ||
      message.content.includes('http://')
    ) {
      // Mark it as link
      link = true;
    }

    // For messages which are not actually links but contain a link in the msg
    message.content.split(' ').some((element) => {
      for (const domain of domains) {
        if (element.endsWith(domain)) {
          // Mark it as a link
          link = true;
        }
      }
    });

    // If the message is marked as a link, then delete the msg and warn the user
    if (link == true) {
      await message.delete();
      await message.channel.send({ embeds: [nolinkembed] });

      link = false;

      // To warn the user when a link is sent
      try {
        const argsAssign = [`${message.author}`, `Links not allowed`];

        message.content = `!warn ${message.author} Links not allowed`;
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
    }
  });
};

module.exports.config = {
  displayName: 'Anti Link',
  dbName: 'ANTI LINK',
};
