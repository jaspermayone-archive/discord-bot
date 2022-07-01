import { MessageEmbed } from "discord.js";

import { CommandHandler } from "../../../interfaces/commands/CommandHandler";
import { errorEmbedGenerator } from "../../../modules/errorEmbedGenerator";
import { heptagramErrorHandler } from "../../../modules/heptagramErrorHandler";

/**
 * Generates an embed with a random cat image.
 */
export const handleMovieQuote: CommandHandler = async (
  Heptagram,
  interaction
): Promise<void> => {
  try {
    const apiMigrationEmbed = new MessageEmbed();
    apiMigrationEmbed.setTitle("API Migration");
    apiMigrationEmbed.setDescription(
      `API Migrations are currently in progress to our first party API. Please try again later.`
    );
    apiMigrationEmbed.addField(
      "Are you a bot developer or coder? Do you have knowledge about API creation and development? If so, please join the discord server and ask for J-dogcoder",
      `Run \`/heptagram about\` for a link to join the discord server.`
    );
    apiMigrationEmbed.setColor(Heptagram.colors.default);
    apiMigrationEmbed.setTimestamp();
    apiMigrationEmbed.setFooter({
      text: `Message sent by Heptagram || ${Heptagram.version}`,
      iconURL: `${Heptagram.user?.avatarURL()}`,
    });

    await interaction.editReply({ embeds: [apiMigrationEmbed] });
  } catch (err) {
    const errorId = await heptagramErrorHandler(
      Heptagram,
      "movie quote command",
      err,
      interaction.guild?.name,
      undefined,
      interaction
    );
    await interaction.editReply({
      embeds: [errorEmbedGenerator(Heptagram, "movie quote", errorId)],
    });
  }
};
