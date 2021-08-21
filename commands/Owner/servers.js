const { colors } = require('../../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'servers',
	description: 'gets list of servers bot is in.',
	category: 'Owner',
	ownerOnly: true,
	hidden: true,

	callback: async ({ client, message, args }) =>{

		if (!args[0]) {

			client.guilds.cache.forEach((guild) => {
				message.channel.send({ content: `The server ${guild.name} (\`${guild.id}\`) has a total of ${guild.memberCount} members.` });

			});
		}
		else {
			const serverArg = args[0];
			client.guilds.fetch(serverArg).then(guild => {

				guild.fetchOwner().then(GuildMember => {

					const embed = new MessageEmbed()
						.setColor(colors.heptagram)
						.setTitle(`Server info for the ${(guild.name)} server:`)
						.setDescription('Server Information for the specified guild.')
						.addFields(
							{ name: 'Guild Name', value: `${guild.name}`, inline: true },
							{ name: 'Guild ID', value: `\`${guild.id}\``, inline: true },
							{ name: 'Guild Member Count', value: `${guild.memberCount}`, inline: true },
							{ name: 'Guild Owner', value: `${GuildMember}`, inline: true },
						)
						.setTimestamp()
						.setFooter("Message sent by the Heptagram Bot", 'https://cdn.heptagram.xyz/Logos/HeptagramLogo%28square%29.png');

					message.reply({ embeds: [embed] });

				});
			})
				.catch(console.error);
		}
	},
};
