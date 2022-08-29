import {
  ActionRowBuilder,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  TextInputBuilder,
} from "@discordjs/builders";
import { TextInputStyle } from "discord.js";

import { CommandHandler } from "../../../interfaces/commands/CommandHandler";
import { errorEmbedGenerator } from "../../../modules/errorEmbedGenerator";
import { heptagramErrorHandler } from "../../../modules/heptagramErrorHandler";

/**
 * Handles the feedback command, building a modal and sending it to the user for a response.
 */
export const handleFeedback: CommandHandler = async (
  Heptagram,
  interaction
) => {
  try {
    const feedbackModal = new ModalBuilder()
      .setCustomId("feedback-modal")
      .setTitle("Provide Feedback");
    const feedbackInput = new TextInputBuilder()
      .setCustomId("feedback")
      .setLabel(
        "This is to provide feedback about the Heptagram Bot. PLEASE DO NOT USE THIS FOR SERVER FEEDBACK. This feedback is only seen by the dev team."
      )
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const actionRow =
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        feedbackInput
      );
    feedbackModal.addComponents(actionRow);
    await interaction.showModal(feedbackModal);
  } catch (err) {
    const errorId = await heptagramErrorHandler(
      Heptagram,
      "feedback command",
      err,
      interaction.guild?.name,
      undefined,
      interaction
    );
    await interaction.editReply({
      embeds: [errorEmbedGenerator(Heptagram, "feedback", errorId)],
    });
  }
};
