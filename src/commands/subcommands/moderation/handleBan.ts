import { CommandHandler } from "../../../interfaces/commands/CommandHandler";
import { customSubstring } from "../../../utils/customSubstring";
import { errorEmbedGenerator } from "../../../utils/errorEmbedGenerator";
import { heptagramErrorHandler } from "../../../utils/heptagramErrorHandler";

/**
 * Bans the `target` user for the provided `reason`, assuming the caller has permissions.
 * Also deletes the `target`'s messages from the last 24 hours.
 */
export const handleBan: CommandHandler = async (
  Heptagram,
  interaction,
) => {
  try {
    const { guild, member } = interaction;
    const target = interaction.options.getUser("target", true);
    const prune = interaction.options.getNumber("prune", true);
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
      !member.permissions.has("BAN_MEMBERS") ||
      !targetMember ||
      targetMember.permissions.has("BAN_MEMBERS")
    ) {
      await interaction.editReply({
        content: "You don't have permission to do that!",
      });
      return;
    }

    if (target.id === member.user.id) {
      await interaction.editReply({
        content: "You can't ban yourself!",
      });
      return;
    }
    if (target.id === Heptagram.user?.id) {
      await interaction.editReply({
        content: "You can't ban me!",
      });
      return;
    }

    if (prune < 0 || prune > 7) {
      await interaction.editReply({
        content: "Invalid prune value!",
      });
      return;
    }

    if (!targetMember.bannable) {
      await interaction.editReply({
        content: "I can't ban that user!",
      });
      return;
    }

    await targetMember.ban({
      reason: customSubstring(reason, 1000),
      days: prune,
    });

    await interaction.editReply({
      content: `Banned ${target.tag}`,
    });
  } catch (err) {
    const errorId = await heptagramErrorHandler(
      Heptagram,
      "ban command",
      err,
      interaction.guild?.name,
      undefined,
      interaction
    );
    await interaction.editReply({
      embeds: [errorEmbedGenerator(Heptagram, "ban", errorId)],
    });
  }
};
