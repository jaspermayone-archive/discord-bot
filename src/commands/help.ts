import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

import config from "../config/config";
import { Command } from "../interfaces/Command";

export const help: Command = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Provides information on using this bot."),

  run: async (interaction) => {
    await interaction.deferReply();

    const helpEmbed = new MessageEmbed()
      .setTitle("Heptagram Discord Bot")
      .setDescription(
        "The open-source multipurpose Discord bot with the goal to be the single needed bot for any server."
      )
      .addField(
        "Show your progress",
        "To see your current progress in the challenge, and the day you last checked in, use `/view`."
      )
      .setFooter({
        text: `Message sent by Heptagram Bot || ${process.env.npm_package_version}`,
        iconURL: config.cdn.circlelogo,
      })
      .setColor("#fff826")
      .setTimestamp();

    await interaction.editReply({ embeds: [helpEmbed] });
    return;
  },
};
