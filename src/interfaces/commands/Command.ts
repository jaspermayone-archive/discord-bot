import {
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

import { Heptagram } from "../Heptagram";


/**
 * Model used to pass around Heptagrams's Command structure.
 */
export interface Command {
  data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;

    /**
   * Handles the logic for running a given command.
   *
   * @param {BeccaLyria} Heptagram's Discord instance.
   * @param {CommandInteraction} interaction The interaction payload from Discord.
   */
     run: (
      Heptagram: Heptagram,
      interaction: CommandInteraction,
    ) => Promise<void>;
  }
