const { colors, cdn } = require('../../config.json');
module.exports = {
	name: 'steal',
	description: 'steals emoji from different server',
	category: 'Utilitys',
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: "<@emoji>",
	permissions: ['MANAGE_EMOJIS'],
	cooldown: '1m',

	callback: async ({ message }) => {
          
  const emoji = args[0];
  if (!emoji) return message.channel.send(`Please Give Me A Emoji!`);
   
  let customemoji = Discord.Util.parseEmoji(emoji);

  if (customemoji.id) {
      const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
        customemoji.animated ? "gif" : "png"
      }`;
      const name = args.slice(1).join(" ");
      message.guild.emojis.create(
          `${Link}`,
          `${name || `${customemoji.name}`}`
      ).catch(error => {
          console.log(error)
      })
      const Added = new Discord.MessageEmbed()
          .setTitle(`Emoji Added`)
          .setColor(colors.heptagram)
          .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
          .setDescription(
              `**Emoji Has Been Added!** | **Name:** \`${name || `${customemoji.name}`}\` | **Preview:** [Click Me](${Link})`
          );
          
      return message.channel.send(Added).catch(e => {
          console.log(e)
      })
  } else {
      let CheckEmoji = parse(emoji, {
          assetType: "png"
      });
      if (!CheckEmoji[0])
          return message.channel.send(`Please Give Me A Valid Emoji!`);
      message.channel.send(
          `You Can Use Normal Emoji Without Adding In Server!`
      );
  }
	}} 