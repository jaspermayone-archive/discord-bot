module.exports = (client, instance) => {

	const { _defaultPrefix: prefix } = instance;

	client.on('message', async message => {
		const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
		if (message.content.match(prefixMention)) {
			return message.reply(`Hey there! Need some help? My commands can be accessed through my prefix. My prefix in this server is \`${prefix}\`. You can use \`${prefix}help\` for a list of all my commands.`);
		}
	});
};