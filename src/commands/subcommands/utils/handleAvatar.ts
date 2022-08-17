import { EmbedBuilder } from "discord.js";

import { CommandHandler } from "../../../interfaces/commands/CommandHandler";
import { errorEmbedGenerator } from "../../../modules/errorEmbedGenerator";
import { heptagramErrorHandler } from "../../../modules/heptagramErrorHandler";

/**
 * Generates an embed with a user's avatar.
 */
export const handleAvatar: CommandHandler = async (
  Heptagram,
  interaction
): Promise<void> => {
  try {
    const target = interaction.options.getUser("user", true);
    const targetName = target.username;

    const avatarEmbed = new EmbedBuilder();
    avatarEmbed.setColor(Heptagram.colors.default);
    avatarEmbed.setTitle(`${targetName}'s Avatar:`);
    avatarEmbed.setImage(`${target.displayAvatarURL({ size: 4096 })}`);
    avatarEmbed.setTimestamp();
    avatarEmbed.setFooter({
      text: `Message sent by Heptagram || ${Heptagram.version}`,
      iconURL: `${Heptagram.user?.avatarURL()}`,
    });

    await interaction.editReply({ embeds: [avatarEmbed] });
  } catch (err) {
    const errorId = await heptagramErrorHandler(
      Heptagram,
      "avatar command",
      err,
      interaction.guild?.name,
      undefined,
      interaction
    );
    await interaction.editReply({
      embeds: [errorEmbedGenerator(Heptagram, "avatar", errorId)],
    });
  }
};
