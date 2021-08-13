const { colors, cdn } = require('../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = (client, instance) => {

	const { _defaultPrefix: prefix } = instance;

	client.on('messageCreate', async message => {
		const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
		if (message.content.match(prefixMention)) {

			const prefixembed = new MessageEmbed()
				.setColor(colors.heptagram)
				.setTitle('Need some help?!')
				.setDescription(`Hey there <@${message.author.id}>! My commands can be accessed through my prefix. My prefix in this server is \`${prefix}\`. You can use \`${prefix}help\` for a list of all my commands.`)
				.setTimestamp()
				.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

			return message.reply({ embeds: [prefixembed] });
		}
	});
};
