import { CommandInteraction } from "discord.js";

import { Heptagram } from "../Heptagram";

/**
 * Handles the logic execution for a sub-command.
 *
 * @param {Heptagram} Heptagram's Discord instance.
 * @param {CommandInteraction} interaction The interaction payload from Discord.
 */
export type CommandHandler = (
  Heptagram: Heptagram,
  interaction: CommandInteraction,
) => Promise<void>;