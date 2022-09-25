import { CommandHandler } from "../../../interfaces/commands/CommandHandler";
import { AutomodSettings } from "../../../interfaces/settings/AutomodSettings";
import { errorEmbedGenerator } from "../../../modules/errorEmbedGenerator";
import { heptagramErrorHandler } from "../../../modules/heptagramErrorHandler";
import { resetSetting } from "../../../modules/settings/resetSetting";

/**
 * Resets the given `setting` to the default value.
 */
export const handleAutomodReset: CommandHandler = async (
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

    const setting = interaction.options.getString("setting");
    const success = await resetSetting(
      Heptagram,
      guild.id,
      guild.name,
      setting as AutomodSettings,
      config
    );
    await interaction.editReply(
      success
        ? `Successfully reset the \`${setting}\` setting.`
        : `Failed to reset the \`${setting}\` setting.`
    );
    return;
  } catch (err) {
    const errorId = await heptagramErrorHandler(
      Heptagram,
      "automod reset command",
      err,
      interaction.guild?.name,
      undefined,
      interaction
    );
    await interaction.editReply({
      embeds: [errorEmbedGenerator(Heptagram, "automod reset", errorId)],
    });
  }
};
