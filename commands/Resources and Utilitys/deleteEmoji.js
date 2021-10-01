const { colors, cdn } = require('../../config.json');
const { parse } = require("twemoji-parser");
module.exports = {
	name: 'delemoji',
	description: 'deletes emoji from server',
	category: 'Utilitys',
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: "<@emoji>",
	ermissions: ['MANAGE_EMOJIS'],
	cooldown: 3000,

	callback: async ({ message }) => {
		
		const emoji = args[0];
		if (!emoji) return message.channel.send(`Please Give Me A Emoji!`);
	    
		let customemoji = Discord.Util.parseEmoji(emoji);
	    
		if (customemoji.id) {
		  const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
		    customemoji.animated ? "gif" : "png"
		  }`;
		  const name = args.slice(1).join(" ");
		  message.guild.emojis.resolve(customemoji.id).delete();
	    
		  const Added = new MessageEmbed()
		    .setTitle(`Emoji Deleted`)
		    .setColor(colors.heptagram)
		    .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
		    .setDescription(
		      `Emoji Has Been Deleted!`
		    );
		  return message.channel.send(Added);
		} else {
		  let CheckEmoji = parse(emoji, { assetType: "png" });
		  if (!CheckEmoji[0])
		    return message.channel.send(`Please Give Me A Valid Emoji!`);
		  message.channel.send(
		    `You Can Use Normal Emoji Without Adding In Server!`
		  );
		}
	    
	}}