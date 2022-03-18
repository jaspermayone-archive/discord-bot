const apimigrationembed = new MessageEmbed()
.setTitle("API Migration")
.setDescription(`API Migrations are currently in progress to our first party API. Please try again later. For more info, run \`${prefix}api\``)
.setColor(client.config.colors.heptagram)
.setTimestamp()
.setFooter({
  text: `Message sent by Heptagram || ${pjson.version}`,
  iconURL: `${client.config.cdn.sqlogo}`,
});
message.reply({ embeds: [apimigrationembed] });