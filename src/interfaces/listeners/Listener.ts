import { Message } from "discord.js";

import { Heptagram } from "../Heptagram";

export interface Listener {
  name: string;
  description: string;
  /**
   * Handles the logic for a given listener.
   *
   * @param {Heptagram} Heptagram's Discord instance.
   * @param {Message} message The message that triggered the listener.
   */
  run: (Heptagram: Heptagram, message: Message) => Promise<void>;
}
