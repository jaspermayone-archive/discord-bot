import { EmbedBuilder } from "discord.js";

import { CommandHandler } from "../../../interfaces/commands/CommandHandler";
import { errorEmbedGenerator } from "../../../modules/errorEmbedGenerator";
import { heptagramErrorHandler } from "../../../modules/heptagramErrorHandler";

/**
 * Generates an embed with Heptagram's uptime.
 */
export const handleUptime: CommandHandler = async (Heptagram, interaction) => {
  try {
    const seconds = Math.round(process.uptime());
    const days = seconds >= 86400 ? Math.floor(seconds / 86400) : 0;
    const hours =
      seconds >= 3600 ? Math.floor((seconds - days * 86400) / 3600) : 0;
    const minutes =
      seconds >= 60
        ? Math.floor((seconds - days * 86400 - hours * 3600) / 60)
        : 0;
    const secondsRemain = seconds - days * 86400 - hours * 3600 - minutes * 60;

    const uptimeEmbed = new EmbedBuilder();
    uptimeEmbed.setTitle(
      "<:status_online:951855000605298708> Uptime: <:status_online:951855000605298708>"
    );
    uptimeEmbed.setColor(Heptagram.colors.default);
    uptimeEmbed.setDescription("Heptagram has been online for:");
    uptimeEmbed.addFields(
      {
        name: "Days",
        value: days.toString(),
        inline: true,
      },
      {
        name: "Hours",
        value: hours.toString(),
        inline: true,
      },
      {
        name: "Minutes",
        value: minutes.toString(),
        inline: true,
      },
      {
        name: "Seconds",
        value: secondsRemain.toString(),
        inline: true,
      }
    );
    uptimeEmbed.setTimestamp();
    uptimeEmbed.setFooter({
      text: `Message sent by Heptagram || ${Heptagram.version}`,
      iconURL: `${Heptagram.user?.avatarURL()}`,
    });

    await interaction.editReply({ embeds: [uptimeEmbed] });
  } catch (err) {
    const errorId = await heptagramErrorHandler(
      Heptagram,
      "uptime command",
      err,
      interaction.guild?.name,
      undefined,
      interaction
    );
    await interaction.editReply({
      embeds: [errorEmbedGenerator(Heptagram, "uptime", errorId)],
    });
  }
};
