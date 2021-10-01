const Discord = require('discord.js');
// const malScraper = require('mal-scraper');
const Kitsu = require('kitsu.js');
const kitsu = new Kitsu();
const pjson = require('../../package.json');
const { colors, cdn } = require('../../config.json');

module.exports = {
	name: 'anime',
	description: 'Gives info about the requested anime',
	category: 'Fun',
	minArgs: 1,
	maxArgs: 4,
	expectedArgs: "<anime-name>",


	callback: async (message, args) => {

		const search = message.content.split(/\s+/g).slice(1).join(" ");
		if(!args[0]) return message.channel.send("Please specify the anime movie");
		kitsu.searchAnime(search).then(async result => {
			if(result.length === 0) return message.channel.send("This is not a valid anime movie");

			const anime = result[0];
			const embed = new Discord.MessageEmbed()
				.setColor(colors.heptagram)
				.setAuthor(`${anime.titles.english ? anime.titles.english : search} | ${anime.showType}`, anime.posterImage.original)
				.setDescription(anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
				.addField('❯ Information', `•**Japanese Name:** ${anime.titles.romaji}\n•**Age Rating:** ${anime.ageRating}\n•**Is it NSFW:** ${anime.nsfw ? 'Yes' : 'No'}`, true)
				.addField('❯ Stats', `•**Avg Rating:** ${anime.averageRating}\n•**Rank by rating:** ${anime.ratingRank}\n•**Rank by popularity:** ${anime.popularityRank}`, true)
				.addField('❯ Status', `•**Episode Count:** ${anime.episodeCount ? anime.episodeCount : 'N/A'}\n`, true)
				.setThumbnail(anime.posterImage.original, 100, 200)
				.setFooter(`Message sent by the Heptagram Bot || ${pjson.version}`, `${cdn.sqlogo}`);

			return message.channel.send(embed);
		}).catch(err => {
			console.log(err);
			return message.channel.send(`Couldn't find result for ${search}`);
		});

	} };