const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { prefix, colors } = require("../../config.json");

module.exports = {
	name: 'help',
	guildOnly: false,
	description: 'List all of my commands or info about a specific command.',
	category: 'Utilitys',

	execute({ client, message, args }) {
		if (!args[0]) {
			const categories = [];

			readdirSync("./commands/").forEach((dir) => {
				const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
					file.endsWith(".js"),
				);

				const cmds = commands.map((command) => {
					const file = require(`../../commands/${dir}/${command}`);

					if (!file.name) return "No command name.";

					const name = file.name.replace(".js", "");

					return `\`${name}\``;
				});

				let data = new Object();

				data = {
					name: dir.toUpperCase(),
					value: cmds.length === 0 ? "In progress." : cmds.join(" "),
				};

				categories.push(data);
			});

			const embed = new MessageEmbed()
				.setTitle("📬 Need help? Here are all of my commands:")
				.addFields(categories)
				.setDescription(
					`Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help ping\`.`,
				)
				.setFooter(
					`Requested by ${message.author.tag}`,
					message.author.displayAvatarURL({ dynamic: true }),
				)
				.setTimestamp()
				.setColor(colors.heptagram);
			return message.channel.send(embed);
		}
		else {
			const command =
              client.commands.get(args[0].toLowerCase()) ||
              client.commands.find(
              	(c) => c.aliases && c.aliases.includes(args[0].toLowerCase()),
              );

			if (!command) {
				const embed = new MessageEmbed()
					.setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
					.setColor(colors.heptagram);
				return message.channel.send(embed);
			}

			const embed = new MessageEmbed()
				.setTitle("Command Details:")
				.addField("PREFIX:", `\`${prefix}\``)
				.addField(
					"COMMAND:",
					command.name ? `\`${command.name}\`` : "No name for this command.",
				)
				.addField(
					"ALIASES:",
					command.aliases
						? `\`${command.aliases.join("` `")}\``
						: "No aliases for this command.",
				)
				.addField(
					"USAGE:",
					command.usage
						? `\`${prefix}${command.name} ${command.usage}\``
						: `\`${prefix}${command.name}\``,
				)
				.addField(
					"DESCRIPTION:",
					command.description
						? command.description
						: "No description for this command.",
				)
				.setFooter(
					`Requested by ${message.author.tag}`,
					message.author.displayAvatarURL({ dynamic: true }),
				)
				.setTimestamp()
				.setColor(colors.heptagram);
			return message.channel.send(embed);
		}

	},
};