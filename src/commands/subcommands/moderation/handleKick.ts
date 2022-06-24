import { CommandHandler } from "../../../interfaces/commands/CommandHandler";
import { customSubstring } from "../../../utils/customSubstring";
import { errorEmbedGenerator } from "../../../modules/errorEmbedGenerator";
import { heptagramErrorHandler } from "../../../modules/heptagramErrorHandler";

/**
 * Provided the caller has permission, kicks the `target` user from the guild
 * for the given `reason`.
 */
export const handleKick: CommandHandler = async (Heptagram, interaction) => {
  try {
    const { guild, member } = interaction;
    const target = interaction.options.getUser("target", true);
    const reason = interaction.options.getString("reason", true);

    if (!guild) {
      await interaction.editReply({
        content: "Missing Guild!!",
      });
      return;
    }

    const targetMember = await guild.members.fetch(target.id);

    if (
      !member ||
      typeof member.permissions === "string" ||
      !member.permissions.has("KICK_MEMBERS") ||
      !targetMember ||
      targetMember.permissions.has("KICK_MEMBERS")
    ) {
      await interaction.editReply({
        content: "You don't have permission to do that!",
      });
      return;
    }

    if (target.id === member.user.id) {
      await interaction.editReply({
        content: "You can't kick yourself!",
      });
      return;
    }
    if (target.id === Heptagram.user?.id) {
      await interaction.editReply({
        content: "You can't kick me!",
      });
      return;
    }

    if (!targetMember.kickable) {
      await interaction.editReply({
        content: "I can't kick this user!",
      });
      return;
    }

    await targetMember.kick(customSubstring(reason, 1000));

    await interaction.editReply({ content: "Kicked " + target.tag });
  } catch (err) {
    const errorId = await heptagramErrorHandler(
      Heptagram,
      "kick command",
      err,
      interaction.guild?.name,
      undefined,
      interaction
    );
    await interaction.editReply({
      embeds: [errorEmbedGenerator(Heptagram, "kick", errorId)],
    });
  }
};
