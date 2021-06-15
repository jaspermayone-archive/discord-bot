const { colors } = require('../../config.json');
const commandCooldowns = require('../../command-cooldowns');

module.exports = {
	name: 'mask',
	guildOnly: false,
	description: 'tells chat to put their mask on',
	category: 'COVID',
	cooldown: 5,

	execute({ message, Discord, client }) {
		if (commandCooldowns({ name: this.name, cooldown: this.cooldown, message, Discord, client })) return;

		const embed = new Discord.MessageEmbed()
			.setTitle('COVID Police: 🚨')
			.setColor(colors.heptagram)
			.setDescription('Put your mask back on!');
		message.channel.send(embed);
	},
};