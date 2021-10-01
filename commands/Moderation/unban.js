const { MessageEmbed } = require('discord-js');
const { colors, cdn } = require('../../config.json');
const pjson = require('../../package.json');

module.exports = {
	name: 'unban',
	guildOnly: true,
	description: 'unbans users',
	category: 'Moderation',
	minArgs: 2,
	maxArgs: -1,
	expectedArgs: "<@member you want to kick> <reason>",
	permissions: ["BAN_MEMBERS"],

	callback: async ({ message, client, args }) => {


		if (!args[0]) return message.channel.send('please enter a users id to unban!').then(m => m.delete({ timeout: 5000 }));

		let member;

		try {
		    member = await client.users.fetch(args[0]);
		}
		catch (e) {
		    console.log(e);
		    return message.channel.send('Not a valid user!').then(m => m.delete({ timeout: 5000 }));
		}

		const reason = args[1] ? args.slice(1).join(' ') : 'no reason';

		const embed = new MessageEmbed()
		    .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

		message.guild.fetchBans().then(bans => {

		    const user = bans.find(ban => ban.user.id === member.id);

		    if (user) {
				embed.setTitle(`Successfully Unbanned ${user.user.tag}`);
			    embed.addField('User ID', user.user.id, true);
			    embed.addField('user Tag', user.user.tag, true);
			    embed.addField('Banned Reason', user.reason != null ? user.reason : 'no reason');
			    embed.addField('Unbanned Reason', reason);
				embed.setFooter(`Message sent by the Heptagram Bot || ${pjson.version}`, `${cdn.sqlogo}`);
				embed.setTimestamp();
				embed.setColor(colors.heptagram);

				message.guild.members.unban(user.user.id, reason).then(() => message.channel.send(embed));
		    }
			else {
				embed.setTitle(`User ${member.tag} isn't banned!`);
				embed.setFooter(`Message sent by the Heptagram Bot || ${pjson.version}`, `${cdn.sqlogo}`);
				embed.setTimestamp();
				embed.setColor(colors.heptagram);
				message.channel.send(embed);
		    }

		}).catch(e => {
		    console.log(e);
		    message.channel.send('An error has occurred!');
		});
	} };