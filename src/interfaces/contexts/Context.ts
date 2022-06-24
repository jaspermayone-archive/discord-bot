import { ContextMenuInteraction } from "discord.js";

import { Heptagram } from "../Heptagram";

export interface Context {
  data: {
    name: string;
    type: 2 | 3;
  };
  /**
   * Handles the logic for a given context menu interaction.
   *
   * @param {Heptagram} Heptagram's Discord instance.
   * @param {ContextMenuInteraction} interaction The context menu interaction payload.
   */
  run: (
    Heptagram: Heptagram,
    interaction: ContextMenuInteraction
  ) => Promise<void>;
}
