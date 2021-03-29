module.exports = {
    name: 'reactionrole',
    description: "Sets up a reaction role message!",
    async execute(message, args, Discord, client) {
        const channel = '825873304854331393';
        const roleOne = message.guild.roles.cache.find(role => role.name === "role 1");
        const roleTwo = message.guild.roles.cache.find(role => role.name === "role 2");
 
        const roleOneEmoji = '1️⃣';
        const roleTwoEmoji = '2️⃣';
 
        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('Choose a team to play on!')
            .setDescription('Choosing a team will allow you to interact with your teammates!\n\n'
                + `${roleOneEmoji} for team 1\n`
                + `${roleTwoEmoji} for team 2`);
 
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(roleOneEmoji);
        messageEmbed.react(roleTwoEmoji);
 
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === roleOneEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(roleOne);
                }
                if (reaction.emoji.name === roleTwoEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(roleTwo);
                }
            } else {
                return;
            }
 
        });
 
        client.on('messageReactionRemove', async (reaction, user) => {c
 
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === roleOneEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(roleOne);
                }
                if (reaction.emoji.name === roleTwoEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(roleTwo);
                }
            } else {
                return;
            }
        });
    }
 
}   