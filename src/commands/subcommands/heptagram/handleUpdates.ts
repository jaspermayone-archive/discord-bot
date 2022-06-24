import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js";

import { nextScheduledRelease, updatesSinceLastRelease } from "../../../config/commands/updatesData";
import { CommandHandler } from "../../../interfaces/commands/CommandHandler";
import { errorEmbedGenerator } from "../../../modules/errorEmbedGenerator";
import { heptagramErrorHandler } from "../../../modules/heptagramErrorHandler";

/**
 * Generates an embed explaining the new release schedule, and what the update
 * process breaks in terms of lost cache.
 */
export const handleUpdates: CommandHandler = async (Heptagram, interaction) => {
  try {
    const { commitHash: hash } = Heptagram;
    const updateEmbed = new MessageEmbed();
    updateEmbed.setTitle("Updates");
    updateEmbed.setDescription("Here are the updates since the last release.");
    updateEmbed.addField(
      "Latest Updates:",
      updatesSinceLastRelease.join("\n")
    );
    updateEmbed.addField(
      "New version:",
      process.env.npm_package_version || "0.0.0"
    );
    updateEmbed.addField(
      "Next release:",
      nextScheduledRelease
    );
    updateEmbed.addField(
      "Changelog ???",
      "Chage desctiption here???"
    );
    updateEmbed.addField(
      "Commit hash:",
      `[${hash.slice(
        0,
        7
      )}](https://github.com/heptagram-bot-project/discord-bot/commit/${hash})`
    );
    updateEmbed.setColor(Heptagram.colors.default);
    updateEmbed.setFooter({
      text: `Message sent by Heptagram || v${process.env.npm_package_version}`,
      iconURL: `${Heptagram.user?.avatarURL()}`,
    });

    const button = new MessageButton()
      .setLabel("View Full Changelog")
      .setStyle("LINK")
      .setURL(
        "https://github.com/Heptagram-Project/discord-bot/releases"
      );

    const row = new MessageActionRow().addComponents([button]);
    await interaction.editReply({ embeds: [updateEmbed], components: [row] });
  } catch (err) {
    const errorId = await heptagramErrorHandler(
      Heptagram,
      "updates command",
      err,
      interaction.guild?.name,
      undefined,
      interaction
    );
    await interaction.editReply({
      embeds: [errorEmbedGenerator(Heptagram, "updates", errorId)],
    });
  }
};
