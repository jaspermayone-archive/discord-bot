const urban = require('urban');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { colors, cdn } = require('../../config.json');

module.exports = {
	name: 'urban',
	category: 'Fun',
	description: 'Gets an urban dictionary definition',
	minArgs: 0,
	maxArgs: -1,
	expectedArgs: "",

	execute({ message, args }) {
		if (!args[0] || !['search', 'random'].includes(args[0])) {return message.reply('Please provide <search|random> (query).');}
		const image = 'http://cdn.marketplaceimages.windowsphone.com/v8/images/5c942bfe-6c90-45b0-8cd7-1f2129c6e319?imageType=ws_icon_medium';
		const search = args[1] ? urban(args.slice(1).join(' ')) : urban.random();
		try {
			search.first(res => {
				if (!res) return message.reply('No results found for this topic, sorry!');
				const { word, definition, example, thumbs_up, thumbs_down, permalink } = res;

				const description = stripIndents`**Defintion:** ${definition || 'No definition'}
                    **Example:** ${example || 'No Example'}
                    **Upvote:** ${thumbs_up || 0}
                    **Downvote:** ${thumbs_down || 0}
                    **Link:** [link to ${word}](${permalink || 'https://www.urbandictionary.com/'})`;

				if (description.length >= 1024) {return message.reply('This definition is too long of a string for a message embed sorry!');}
				else {
					const embed = new MessageEmbed()
						.setColor(colors.heptagram)
						.setAuthor(`Urban Dictionary | ${word}`, image)
						.setThumbnail(image)
						.setDescription(description)
						.setTimestamp()
						.setFooter("Message sent by the Heptagram Bot", `${cdn.sqlogo}`);

					message.channel.send(embed);
				}
			});
		}
		catch (err) {
			return message.channel.send(`Error while searching... ${err}`);
		}
	},
};