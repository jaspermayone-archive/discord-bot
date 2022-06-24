import { Heptagram } from "../interfaces/Heptagram";
import { HeptagramCounts } from "../interfaces/heptagram/HeptagramCounts";

/**
 * Aggregates Heptagram's guild count, member counts, and
 * command counts.
 *
 * @param {Heptagram} Heptagram's Discord instance.
 * @returns {HeptagramCounts} An object representing the aggregated counts.
 */
export const getCounts = (Heptagram: Heptagram): HeptagramCounts => {
  const guildCount = Heptagram.guilds.cache.size;
  let memberCount = 0;
  let commandCount = 0;

  Heptagram.guilds.cache.forEach((guild) => {
    memberCount += guild.memberCount;
  });

  Heptagram.commands.forEach((command) => {
    const parsed = command.data.toJSON().options;
    if (!parsed) {
      return;
    }
    parsed.forEach((option) => {
      // subcommands are type 1
      if (option.type === 1) {
        commandCount++;
      }
    });
  });

  commandCount += Heptagram.contexts.length;

  return {
    commands: commandCount,
    guilds: guildCount,
    members: memberCount,
  };
};