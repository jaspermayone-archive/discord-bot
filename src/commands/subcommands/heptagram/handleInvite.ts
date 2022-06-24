import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js";

import { CommandHandler } from "../../../interfaces/commands/CommandHandler";
import { errorEmbedGenerator } from "../../../modules/errorEmbedGenerator";
import { heptagramErrorHandler } from "../../../modules/heptagramErrorHandler";

/**
 * Generates an embed containing a link to invite Heptagram. The link is handled
 * by the Heptagram Project domain, to ensure it is up to date with permission and scope
 * changes.
 */
export const handleInvite: CommandHandler = async (Heptagram, interaction) => {
  try {
    const inviteEmbed = new MessageEmbed();
    inviteEmbed.setTitle("Invite Heptagram");
    inviteEmbed.setDescription(
      "Use the `Invite Heptagram` button to get the invite link"
    );
    inviteEmbed.setColor(Heptagram.colors.default);
    inviteEmbed.setFooter({
      text: `Message sent by Heptagram || v${process.env.npm_package_version}`,
      iconURL: `${Heptagram.user?.avatarURL()}`,
    });
    inviteEmbed.setTimestamp();

    const inviteButton = new MessageButton()
      .setLabel("Invite Heptagram")
      .setStyle("LINK")
      .setURL("https://invite.heptagrambotproject.com");

    const row = new MessageActionRow().addComponents([inviteButton]);

    await interaction.editReply({ embeds: [inviteEmbed], components: [row] });
  } catch (err) {
    const errorId = await heptagramErrorHandler(
      Heptagram,
      "invite command",
      err,
      interaction.guild?.name,
      undefined,
      interaction
    );
    await interaction.editReply({
      embeds: [errorEmbedGenerator(Heptagram, "invite", errorId)],
    });
  }
};
