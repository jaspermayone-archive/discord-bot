const { colors, cdn } = require('../../config.json');
const { MessageEmbed } = require('discord.js');
const pjson = require('../../package.json');

module.exports = {
  name: 'server',
  description: 'gets list of servers bot is in.',
  aliases: ['guilds', 'guild', 'servers'],
  category: 'Owner',
  ownerOnly: true,
  hidden: true,

  callback: async ({ client, message, args }) => {

  if (!args[0]) {

      client.guilds.cache.forEach((guild) => {
        message.channel.send({
          content: `The server ${guild.name} (\`${guild.id}\`) has a total of ${guild.memberCount} members.`,
        });
      });
    
    }  else {

      const serverArg = args[0];
      
      client.guilds
        .fetch(serverArg)
        .then((guild) => {
          guild.fetchOwner().then((GuildMember) => {
            const embed = new MessageEmbed()
              .setColor(colors.heptagram)
              .setTitle(`Server info for the ${guild.name} server:`)
              .setDescription('Server Information for the specified guild.')
              .addFields(
                { name: 'Guild Name', value: `${guild.name}`, inline: true },
                { name: 'Guild ID', value: `\`${guild.id}\``, inline: true },
                {
                  name: 'Guild Member Count',
                  value: `${guild.memberCount}`,
                  inline: true,
                },
                { name: 'Guild Owner', value: `${GuildMember}`, inline: true },
              )
              .setTimestamp()
              .setFooter(`Message sent by the Heptagram Bot || ${pjson.version}`,`${cdn.sqlogo}`);

            message.reply({ embeds: [embed] });
          });
        })
        .catch(console.error);
    }
  },
};
