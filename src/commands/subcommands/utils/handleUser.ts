import { EmbedBuilder } from "discord.js";
import moment from "moment";

import { CommandHandler } from "../../../interfaces/commands/CommandHandler";
import { errorEmbedGenerator } from "../../../modules/errorEmbedGenerator";
import { heptagramErrorHandler } from "../../../modules/heptagramErrorHandler";
import { customSubstring } from "../../../utils/customSubstring";

/**
 * Generates an embed with information about a user.
 */
export const handleUser: CommandHandler = async (
  Heptagram,
  interaction
): Promise<void> => {
  try {
    const { user, guild } = interaction;

    if (!guild) {
      await interaction.editReply({
        content: "This command can only be used in a guild.",
      });
      return;
    }

    const mentioned = interaction.options.getUser("user", true);
    const target = await guild.members.fetch(mentioned?.id || user.id);

    const flagBits = await target.user.fetchFlags();
    const flags = flagBits.toArray();

    const embed = new EmbedBuilder()
      .setColor(Heptagram.colors.default)
      // set thumnail to target user's avatar
      .setThumbnail(target.displayAvatarURL())
      .addFields(
        { name: `Username:`, value: `${target.user}`, inline: true },
        { name: "Nickname", value: `${target.displayName}`, inline: true },
        { name: "ID", value: `${target.id}`, inline: true },
        {
          name: "In Server",
          value: `${interaction.guild?.name}`,
          inline: true,
        },
        {
          name: "Joined Server On",
          value: `${moment(target.joinedAt).format("LLL")}`,
          inline: true,
        },
        {
          name: "Account Created On",
          value: `${moment(target.user.createdAt).format("LLL")}`,
          inline: true,
        },
        {
          name: "Role(s)",
          value: customSubstring(
            target.roles.cache
              .filter((role) => role.id !== guild.id)
              .map((role) => `<@&${role.id}>`)
              .join(" "),
            1000
          ),
          inline: false,
        },
        {
          name: "Display Color",
          value: `${target.displayHexColor}`,
          inline: true,
        },
        {
          name: "Nitro:",
          value: target.premiumSinceTimestamp
            ? `Since ${new Date(
                target.premiumSinceTimestamp
              ).toLocaleDateString()}`
            : "No.",
          inline: true,
        }
      )
      .setTimestamp()
      .setFooter({
        text: `Message sent by Heptagram || ${Heptagram.version}`,
        iconURL: `${Heptagram.user?.avatarURL()}`,
      });

    await interaction.editReply({ embeds: [embed] });
  } catch (err) {
    const errorId = await heptagramErrorHandler(
      Heptagram,
      "user command",
      err,
      interaction.guild?.name,
      undefined,
      interaction
    );
    await interaction.editReply({
      embeds: [errorEmbedGenerator(Heptagram, "user", errorId)],
    });
  }
};
