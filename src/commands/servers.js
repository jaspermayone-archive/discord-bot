const { Discord, MessageEmbed } = require('discord.js');
const { colors } = require('../config/config.json');
const pjson = require('../../package.json');

exports.run = async (client, message, args, level) => {
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
.setFooter({
      text: `Message sent by Heptagram || ${pjson.version}`,
      iconURL: `${client.config.cdn.sqlogo}`,
    });
          message.reply({ embeds: [embed] });
        });
      })
      .catch(console.error);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['guilds', 'guild', 'servers'],
  permLevel: "Owner"
};

exports.help = {
  name: "servers",
  category: "Owner",
  description: "gets list of servers bot is in.",
  usage: "servers"
};

