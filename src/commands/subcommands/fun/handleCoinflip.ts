import { MessageEmbed } from "discord.js";

import { CommandHandler } from "../../../interfaces/commands/CommandHandler";
import { errorEmbedGenerator } from "../../../modules/errorEmbedGenerator";
import { heptagramErrorHandler } from "../../../modules/heptagramErrorHandler";

/**
 * Generates an embed with eaither heads or tailss
 */
export const handleCoinflip: CommandHandler = async (
  Heptagram,
  interaction
): Promise<void> => {
  try {
    const embed = new MessageEmbed()
      .setColor(Heptagram.colors.default)
      .setTitle("A coin was flipped..")
      .setTimestamp()
      .setFooter({
        text: `Message sent by Heptagram || ${Heptagram.version}`,
        iconURL: `${Heptagram.user?.avatarURL()}`,
      });

    const number = Math.floor(Math.random() * 2);

    if (number === 0) {
      embed.addField("Result", "`Heads`");
    } else {
      embed.addField("Result", "`Tails`");
    }

    await interaction.editReply({ embeds: [embed] });
  } catch (err) {
    const errorId = await heptagramErrorHandler(
      Heptagram,
      "coinflip command",
      err,
      interaction.guild?.name,
      undefined,
      interaction
    );
    await interaction.editReply({
      embeds: [errorEmbedGenerator(Heptagram, "coinflip", errorId)],
    });
  }
};
