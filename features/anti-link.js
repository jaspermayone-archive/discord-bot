const Discord = require('discord.js');
const { colors, cdn } = require('../config.json');
const warn = require('../commands/Moderation/warn');


module.exports = (client) => {
  client.on('messageCreate', async (message) => {
    const linkRegex =
      /(([a-z]+:\/\/)?((aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|xyz|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-.~]+)*(\/([a-z0-9_\-.]*)(\?[a-z0-9+_\-.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;

    const hasLink = linkRegex.test(message.content);

    if (hasLink) {
      const channel = message.channel;
      await message.delete().then(() => {
        const nolinkembed = new Discord.MessageEmbed()
          .setColor(colors.heptagram)
          .setTitle('No links here!')
          .setDescription("Sorry, links aren't allowed here!")
          .setTimestamp()
          .setFooter('Message sent by the Heptagram Bot', `${cdn.sqlogo}`);

        channel.send({ embeds: [nolinkembed] });

      });

      //To warn the user when a link is sent
      try{
        const argsAssign = [`${message.author}`, `Links not allowed`]

        message.content = `!warn ${message.author} Links not allowed`
        await warn.callback({ message: message , args: argsAssign, target: message.author})
        return
      }
      catch(error){
        console.log(error)
        message.channel.send('Error !')
        return
      }


    }
  });
};

module.exports.config = {
  displayName: 'Anti Link',
  dbName: 'ANTI LINK',
};