import { MessageActionRow, MessageButton } from "discord.js";

import { CommandHandler } from "../../../interfaces/commands/CommandHandler";
import { errorEmbedGenerator } from "../../../modules/errorEmbedGenerator";
import { heptagramErrorHandler } from "../../../modules/heptagramErrorHandler";

/**
 * Returns a bit of text and some buttons with the different ways to contact the developer team.
 */
export const handleContact: CommandHandler = async (Heptagram, interaction) => {
  try {
    const discordButton = new MessageButton()
      .setStyle("LINK")
      .setLabel("Discord")
      .setURL("https://discord.heptagrambotproject.com");
    const githubButton = new MessageButton()
      .setStyle("LINK")
      .setLabel("GitHub")
      .setURL("https://github.com/heptagram-bot-project/discord-bot");

    const row = new MessageActionRow().addComponents([
      discordButton,
      githubButton,
    ]);
    await interaction.editReply({
      content: "Contact the developer team.",
      components: [row],
    });
  } catch (err) {
    const errorId = await heptagramErrorHandler(
      Heptagram,
      "contact command",
      err,
      interaction.guild?.name
    );
    await interaction.editReply({
      embeds: [errorEmbedGenerator(Heptagram, "contact", errorId)],
    });
  }
};
