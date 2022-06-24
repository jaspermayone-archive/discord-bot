import { MessageActionRow, MessageButton, MessageEmbed } from "discord.js";

import { CommandHandler } from "../../../interfaces/commands/CommandHandler";
import { errorEmbedGenerator } from "../../../modules/errorEmbedGenerator";
import { getCounts } from "../../../modules/getCounts";
import { heptagramErrorHandler } from "../../../modules/heptagramErrorHandler";

/**
 * Generates an embed containing information about Heptagram.
 */
export const handleAbout: CommandHandler = async (Heptagram, interaction) => {
  try {
    const { guilds, members, commands } = getCounts(Heptagram);
    const aboutEmbed = new MessageEmbed();
    aboutEmbed.setColor(Heptagram.colors.default);
    aboutEmbed.setTitle("About Heptagram");
    aboutEmbed.setDescription("The open-source & multipurpose Discord bot with the goal to be the single needed bot for any server.");
    aboutEmbed.addField(
      "Version:",
      process.env.npm_package_version || "unknown version",
      true
    );
    aboutEmbed.addField("Date Created:", "Mar 26, 2021", true);
    aboutEmbed.addField("Number of Guilds:", guilds.toString(), true);
    aboutEmbed.addField(
      "Number of Members:",
      members.toString(),
      true
    );
    aboutEmbed.addField(
     "Number of Commands:",
      commands.toString(),
      true
    );
    aboutEmbed.setFooter({
      text: `Message sent by Heptagram || v${process.env.npm_package_version}`,
      iconURL: `${Heptagram.user?.avatarURL()}`,
    });

    const supportServerButton = new MessageButton()
      .setLabel("Support Server")
      .setStyle("LINK")
      .setURL("https://discord.heptagrambotproject.com");
    const inviteButton = new MessageButton()
      .setLabel("Invite Heptagram")
      .setStyle("LINK")
      .setURL("https://invite.heptagrambotproject.com");
    const codeButton = new MessageButton()
      .setLabel("GitHub Repository")
      .setStyle("LINK")
      .setURL("https://github.com/heptagram-bot-project/discord-bot");

    const row = new MessageActionRow().addComponents([
      supportServerButton,
      inviteButton,
      codeButton,
    ]);

    await interaction.editReply({ embeds: [aboutEmbed], components: [row] });
  } catch (err) {
    const errorId = await heptagramErrorHandler(
      Heptagram,
      "about command",
      err,
      interaction.guild?.name,
      undefined,
      interaction
    );
    await interaction.editReply({
      embeds: [errorEmbedGenerator(Heptagram, "about", errorId)],
    });
  }
};
