const Discord = require('discord.js');
const { colors } = require('../config/config.json');
const pjson = require('../../package.json');

exports.run = async (client, message, args, level) => {
    if (args[0] === 'join') {
        client.emit('guildMemberAdd', message.member);
  
        const jembed = new Discord.MessageEmbed()
          .setColor(colors.heptagram)
          .setTitle(`Join Emmitted!`)
          .setDescription(
            `You have succesfully emmited a join. || <@${message.author.id}>`,
          )
          .setTimestamp()    
.setFooter({
      text: `Message sent by Heptagram || ${pjson.version}`,
      iconURL: `${client.config.cdn.sqlogo}`,
    });
  
        return message.reply({ embeds: [jembed] });
      }
  
      if (args[0] === 'leave') {
        client.emit('guildMemberLeave', message.member);
  
        const lembed = new Discord.MessageEmbed()
          .setColor(colors.heptagram)
          .setTitle(`Leave Emmitted!`)
          .setDescription(
            `You have succesfully emmited a leave. || <@${message.author.id}>`,
          )
          .setTimestamp()    
.setFooter({
      text: `Message sent by Heptagram || ${pjson.version}`,
      iconURL: `${client.config.cdn.sqlogo}`,
    });
  
        return message.reply({ embeds: [lembed] });
          }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ej', 'emit', 'e'],
  permLevel: "Owner"
};

exports.help = {
  name: "emmit",
  category: "Owner",
  description: "pretends a new user has joined (for testing only)",
  usage: "emmit <join or leave>"
};

