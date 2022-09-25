import { Message } from "discord.js";

import { ServerConfig } from "../database/ServerConfig";
import { Heptagram } from "../Heptagram";

export interface Listener {
  name: string;
  description: string;
  /**
   * Handles the logic for a given listener.
   *
   * @param {Heptagram} Heptagram's Discord instance.
   * @param {Message} message The message that triggered the listener.
   * @param {ServerConfig} config The server settings from the database.

   */
  run: (
    Heptagram: Heptagram,
    message: Message,
    config: ServerConfig
  ) => Promise<void>;
}
