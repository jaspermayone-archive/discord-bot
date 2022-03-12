const { version } = require ("discord.js");
const { MessageEmbed } = require('discord.js');
const { DurationFormatter } = require ("@sapphire/time-utilities");
const durationFormatter = new DurationFormatter();

exports.run = async (client, interaction) => {
  const duration = durationFormatter.format(client.uptime);

   const statsEmbed = new MessageEmbed()
    .setColor("#fff800")
    .setTitle("Statistics")
    .setDescription(`• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
    .addField("• Uptime:", duration)
    .addField("• Users:", client.guilds.cache.map(g => g.memberCount).reduce((a, b) => a + b).toLocaleString())
    .addField("• Servers:", client.guilds.cache.size.toLocaleString())
    .addField("• Channels:", client.channels.cache.size.toLocaleString())
    .addField("• Discord.js:", `v${version}`)
    .addField("• Node:", `${process.version}`);

 await interaction.reply({embeds: [statsEmbed]});
  };

exports.commandData = {
  name: "stats",
  description: "Show's the bots stats.",
  options: [],
  defaultPermission: true,
};


exports.conf = {
  permLevel: "User",
  guildOnly: false
};