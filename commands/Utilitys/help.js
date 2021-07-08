/* eslint-disable no-undef */

const { prefix, colors } = require('../../config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'help',
	guildOnly: false,
	description: 'List all of my commands or info about a specific command.',
	category: 'Utilitys',

	execute({ message, args, roles }) {

		const information = new Discord.MessageEmbed().setTitle('Command List').setColor(colors.heptagram).setFooter('Heptagram Bot');

		const { commands } = message.client;
		if (args.length === 0 || args[0] === '') {

			const fun = [];
			const utilitys = [];
			const resources = [];
			const moderation = [];

			commands.map(command => {
				if (command.category === 'fun') fun.push(`\`${command.name}\``);
			});
			information.addField('Fun Commands:', value = fun.join(','), false);


			commands.map(command => {
				if (command.category === 'Utilitys') utilitys.push(`\`${command.name}\``);
			});
			information.addField('Utility Commands:', value = utilitys.join(', '), false);


			commands.map(command => {
				if (command.category === 'Resources') resources.push(`\`${command.name}\``);
			});
			information.addField('Resources Commands:', value = resources.join(', '), false);

			const isAdmin = message.member.roles.cache.has(roles.admin);

			if (isAdmin) {

				commands.map(command => {
					if (command.category === 'moderation') moderation.push(`\`${command.name}\``);
				});
				information.addField('Moderation Commands:', value = moderation.join(', '), false);


			}
			else {
				const adminCommands = ['kick', 'mute', 'unmute', 'wipe', 'clear', 'ban', 'admin'];
				commands.map(command => {
					if (command.category === 'moderation' && !adminCommands.includes(command.name)) moderation.push(`\`${command.name}\``);
				});
				information.addField('Moderation Commands:', value = moderation.join(', '), false);
			}

			message.channel.send(information);
		}
		else {
			const name = args[0].toLowerCase();
			const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

			if (!command) {
				return message.reply('that\'s not a valid command!');
			}

			const cmdEmbed = new Discord.MessageEmbed().setTitle('Helping with specific Command').setColor(colors.heptagram).setFooter('Heptagram Bot');
			cmdEmbed.addField(`***${command.name}***`, `**Description:** ${command.description ? command.description : 'NONE'}\n**Usage:** \`${command.usage ? `${prefix}${command.name} ${command.usage}` : `${prefix}${command.name}`}\`\n**Aliases:** \`${command.aliases ? command.aliases.join(', ') : 'NONE'}\` \n**Cooldown:** \`${command.cooldown || 3} second(s)\``, false);

			message.channel.send(cmdEmbed);

		}
	},
};