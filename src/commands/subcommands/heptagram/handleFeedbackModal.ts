import { EmbedBuilder, ModalSubmitInteraction } from "discord.js";

import { Heptagram } from "../../../interfaces/Heptagram";
import { errorEmbedGenerator } from "../../../modules/errorEmbedGenerator";
import { heptagramErrorHandler } from "../../../modules/heptagramErrorHandler";
import { customSubstring } from "../../../utils/customSubstring";

/**
 * Handles the submit event for the feedback modal.
 *
 * @param {Heptagram} Heptagram Heptagram's Discord instance.
 * @param {ModalSubmitInteraction} interaction The interaction payload from Discord.
 */
export const handleFeedbackModal = async (
  Heptagram: Heptagram,
  interaction: ModalSubmitInteraction
) => {
  try {
    await interaction.deferReply({ ephemeral: true });
    const { guild, user } = interaction;
    const feedback = interaction.fields.getTextInputValue("feedback");

    if (!guild) {
      await interaction.editReply({
        content: "Missing Guild!!",
      });
      return;
    }

    const feedbackEmbed = new EmbedBuilder();
    feedbackEmbed.setTitle("Feedback Received!");
    feedbackEmbed.setDescription(customSubstring(feedback, 4000));
    feedbackEmbed.setColor(Heptagram.colors.default);
    feedbackEmbed.addFields([
      {
        name: "Guild",
        value: guild.name,
      },
    ]);
    feedbackEmbed.setAuthor({
      name: user.tag,
      iconURL: user.displayAvatarURL(),
    });
    feedbackEmbed.setFooter({
      text: `Message sent by Heptagram || ${Heptagram.version}`,
      iconURL: `${Heptagram.user?.avatarURL()}`,
    });

    await Heptagram.feedbackHook.send({ embeds: [feedbackEmbed] });

    await interaction.editReply({
      content: "Feedback sent!",
    });
  } catch (err) {
    const errorId = await heptagramErrorHandler(
      Heptagram,
      "feedback modal command",
      err,
      interaction.guild?.name
    );
    await interaction.editReply({
      embeds: [errorEmbedGenerator(Heptagram, "feedback modal", errorId)],
    });
  }
};
