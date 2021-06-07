
const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');

module.exports = {
  name: "lock",
  category: "moderation",
  description: "Locks a Channel",
  guildOnly: true,
  execute: async ({ message, roles, Discord }) => {
    if (!(message.member.hasPermission('MANAGE_SERVER', 'MANAGE_CHANNELS') && message.member.roles.cache.has(roles.admin))) {
      return message.channel.send("You don't have enough Permissions");
    }

    const argRole = message.content.split(' ').slice(1);
    if (!argRole || argRole.length === 0) return message.channel.send({ embed: new Discord.MessageEmbed().setDescription(`You must enter valid role ID's.`) })
    let role = message.guild.roles.cache.get(argRole[0]);


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
