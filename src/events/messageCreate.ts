import { Message, MessageEmbed } from "discord.js";
import config from "../config/config"

export const onMessageCreate = async (message: Message, client) => {

    if (message.author.bot) {
        return;
    }

      if (message.author.id === process.env.OWNER_ID) {
           const reactionEmoji = client.emojis.cache.get(config.emoji.static.custom.HeptaLove);
         await message.react(reactionEmoji);
    }

    // see if message @ mentions the bot
    if (message.mentions.has(client.user)) {
       const useSlashCommandsEmbed = new MessageEmbed()
       .setTitle(` :wave: Hey there ${message.author.username}! :wave: `)
       .setDescription(`I'm Heptagram, The open-source & multipurpose Discord bot with the goal to be the single needed bot for any server./n To inteface with me, you use slash commands. To get started and see all my commands, use \`/help\`.`)
       .setFooter({
        text: `Message sent by Heptagram Bot || ${process.env.npm_package_version}`,
        iconURL: config.cdn.circlelogo,
      })
      .setColor('#fff826')
      .setTimestamp();

       await message.reply({ embeds: [useSlashCommandsEmbed] });
    }
};
