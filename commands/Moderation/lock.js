
const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');

module.exports = {
  name: "lock",
  category: "moderation",
  description: "Locks a Channel for a specific Role.",
  guildOnly: true,
  execute: async ({ message, roles, Discord }) => {
    if (!(message.member.hasPermission('MANAGE_SERVER', 'MANAGE_CHANNELS') && message.member.roles.cache.has(roles.admin))) {
      return message.channel.send("You don't have enough Permissions");
    }

    let argRole
    if (message.mentions.roles.last()) {
      argRole = message.mentions.roles.last().id;
    } else if (/^[0-9]{18}$/i.test(message.content.split(' ').slice(1)[0])) {
      argRole = message.content.split(' ').slice(1);
    } else {
      return message.channel.send("No valid id or mention was Provided!")
    }

    if (!argRole || argRole.length === 0) return message.channel.send({ embed: new Discord.MessageEmbed().setDescription(`You must enter valid role ID's.`) })
    let role = message.guild.roles.cache.get(argRole);


    message.channel.updateOverwrite(role,
      {
        SEND_MESSAGES: false
      },
    );

    const embed = new Discord.MessageEmbed()
      .setTitle("Channel Updates")
      .setDescription(`${message.channel} has been Locked for ${role}`)
      .setColor(colors.heptagram);

    await message.channel.send(embed);

    message.delete();
  }
}
