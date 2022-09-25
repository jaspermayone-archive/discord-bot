import { Message } from "discord.js";

import { ServerConfig } from "../database/ServerConfig";
import { Heptagram } from "../Heptagram";

export type ListenerHandler = (
  Heptagram: Heptagram,
  message: Message,
  config: ServerConfig
) => Promise<void | boolean>;
