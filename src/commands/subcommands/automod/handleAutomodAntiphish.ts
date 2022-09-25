import { EmbedBuilder } from "discord.js";

import { CommandHandler } from "../../../interfaces/commands/CommandHandler";
import { errorEmbedGenerator } from "../../../modules/errorEmbedGenerator";
import { heptagramErrorHandler } from "../../../modules/heptagramErrorHandler";
import { renderSetting } from "../../../modules/settings/renderSetting";
import { setSetting } from "../../../modules/settings/setSetting";
import { customSubstring } from "../../../utils/customSubstring";

/**
 * Provided the `value` is valid, sets the given `setting` to that `value`.
 */
export const handleAutomodAntiphish: CommandHandler = async (
  Heptagram,
  interaction,
  config
) => {
  try {
    const { guild } = interaction;

    if (!guild) {
      await interaction.editReply({
        content: "This command can only be used in a server.",
      });
      return;
    }

    const action = interaction.options.getString("action", true) as
      | "none"
      | "mute"
      | "kick"
      | "ban";

    const isSet = await setSetting(
      Heptagram,
      guild.id,
      guild.name,
      "antiphish",
      action,
      config
    );

    if (!isSet) {
      await interaction.editReply("Failed to set the setting.");
      return;
    }
    const newContent = isSet["antiphish"];
    const parsedContent = renderSetting(Heptagram, "antiphish", newContent);
    const successEmbed = new EmbedBuilder();
    successEmbed.setTitle("Success!");
    successEmbed.setDescription(customSubstring(parsedContent, 2000));
    successEmbed.setTimestamp();
    successEmbed.setColor(Heptagram.colors.default);
    await interaction.editReply({ embeds: [successEmbed] });
  } catch (err) {
    const errorId = await heptagramErrorHandler(
      Heptagram,
      "set command",
      err,
      interaction.guild?.name,
      undefined,
      interaction
    );
    await interaction.editReply({
      embeds: [errorEmbedGenerator(Heptagram, "set", errorId)],
    });
  }
};
