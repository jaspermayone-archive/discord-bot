import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js";

import { CommandHandler } from "../../../interfaces/commands/CommandHandler";
import { errorEmbedGenerator } from "../../../modules/errorEmbedGenerator";
import { heptagramErrorHandler } from "../../../modules/heptagramErrorHandler";

/**
 * Generates an embed containing information on how to interact with Heptagram,
 * links to the support server, docs, and code.
 */
export const handleHelp: CommandHandler = async (Heptagram, interaction) => {
  try {
    const helpEmbed = new MessageEmbed();
    helpEmbed.setTitle("Help");
    helpEmbed.setDescription("Here are some ways to interact with Heptagram.");
    helpEmbed.addField(
      "Contact the developer team:",
      "Use the `Support Server` button."
    );
    helpEmbed.addField("Access the Heptagram Docs:", "Use the `Docs` button.");
    helpEmbed.addField("Source Code:", "Use the `Source Code` button.");
    helpEmbed.addField("Report a bug:", "Use the `Report a Bug` button.");
    helpEmbed.setFooter({
      text: `Message sent by Heptagram || v${process.env.npm_package_version}`,
      iconURL: `${Heptagram.user?.avatarURL()}`,
    });

    const supportServerButton = new MessageButton()
      .setLabel("Support Server")
      .setStyle("LINK")
      .setURL("https://links.heptagrambotproject.com/discord");
    const inviteButton = new MessageButton()
      .setLabel("Invite Heptagram")
      .setStyle("LINK")
      .setURL("https://links.heptagrambotproject.com/invite");
    const codeButton = new MessageButton()
      .setLabel("Source Code")
      .setStyle("LINK")
      .setURL("https://github.com/heptagram-bot-project/discord-bot");
    const docsButton = new MessageButton()
      .setLabel("Docs")
      .setStyle("LINK")
      .setURL("https://docs.heptagrambotproject.com");
    const bugButton = new MessageButton()
      .setLabel("Report a bug")
      .setStyle("LINK")
      .setURL(
        "https://github.com/heptagram-bot-project/discord-bot/issues/new/choose"
      );

    const row = new MessageActionRow().addComponents([
      supportServerButton,
      inviteButton,
      codeButton,
      docsButton,
      bugButton,
    ]);

    await interaction.editReply({ embeds: [helpEmbed], components: [row] });
  } catch (err) {
    const errorId = await heptagramErrorHandler(
      Heptagram,
      "help command",
      err,
      interaction.guild?.name,
      undefined,
      interaction
    );
    await interaction.editReply({
      embeds: [errorEmbedGenerator(Heptagram, "help", errorId)],
    });
  }
};
