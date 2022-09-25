import { EmbedBuilder } from "discord.js";

import { CommandHandler } from "../../../interfaces/commands/CommandHandler";
import { Settings } from "../../../interfaces/settings/Settings";
import { errorEmbedGenerator } from "../../../modules/errorEmbedGenerator";
import { heptagramErrorHandler } from "../../../modules/heptagramErrorHandler";
import { renderSetting } from "../../../modules/settings/renderSetting";
import { setSetting } from "../../../modules/settings/setSetting";
import { validateSetting } from "../../../modules/settings/validateSetting";
import { customSubstring } from "../../../utils/customSubstring";

/**
 * Provided the `value` is valid, sets the given `setting` to that `value`.
 */
export const handleAutomodSet: CommandHandler = async (
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

    const setting = interaction.options.getString("setting", true);
    const value = interaction.options.getString("value", true);

    const isValid = await validateSetting(
      Heptagram,
      setting as Settings,
      value,
      guild,
      config
    );
    if (!isValid) {
      await interaction.editReply(
        `The value \`${value}\` is not valid for the \`${setting}\` setting.`
      );
      return;
    }

    const isSet = await setSetting(
      Heptagram,
      guild.id,
      guild.name,
      setting as Settings,
      value,
      config
    );

    if (!isSet) {
      await interaction.editReply("Failed to set the setting.");
      return;
    }
    const newContent = isSet[setting as Settings];
    const parsedContent = Array.isArray(newContent)
      ? newContent
          .map((el) => renderSetting(Heptagram, setting as Settings, el))
          .join(", ")
      : renderSetting(Heptagram, setting as Settings, newContent);
    const successEmbed = new EmbedBuilder();
    successEmbed.setTitle(`Successfully set \`${setting}\` to \`${value}\`!`);
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
