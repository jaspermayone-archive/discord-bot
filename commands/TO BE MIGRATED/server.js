const { colors, cdn } = require('../../config.json');
const moment = require('moment');
const Discord = require('discord.js');

const regions = {
	brazil: 'Brazil',
	europe: 'Europe',
	hongkong: 'Hong Kong',
	india: 'India',
	japan: 'Japan',
	russia: 'Russia',
	singapore: 'Singapore',
	southafrica: 'South Africa',
	sydeny: 'Sydeny',
	'us-central': 'US Central',
	'us-east': 'US East',
	'us-west': 'US West',
	'us-south': 'US South',
};

module.exports = {
	name: 'server',
	description: 'gives info about server.',
	guildOnly: true,
	category: 'Resources',
	minArgs: 0,
	maxArgs: 0,
	expectedArgs: "",
	cooldown: '1m',

	execute: ({ message }) => {

		const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;

		const generalEmbed = new Discord.MessageEmbed()
			.setColor(colors.heptagram)
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.addField('General Server Info', [
				`**Name:** ${message.guild.name}`,
				`**ID:** ${message.guild.id}`,
				`**Owner:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
				`**Region:** ${regions[message.guild.region]}`,
				`**Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
				`**Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} [${moment(message.guild.createdTimestamp).fromNow()}]`,
				'\u200b',
			])
			.addField('Server Statistics', [
				`**Role Count:** ${roles.length}`,
				`**Emoji Count:** ${emojis.size}`,
				`**Humans:** ${members.filter(member => !member.user.bot).size}`,
				`**Bots:** ${members.filter(member => member.user.bot).size}`,
				`**Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
				`**Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`,
				'\u200b',
			])
			.setTimestamp()
			.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

		message.reply({ embeds: [generalEmbed] });
	},
};
