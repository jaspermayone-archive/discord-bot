import { Message } from "discord.js";

import { Heptagram } from "../Heptagram";

export type ListenerHandler = (
  Heptagram: Heptagram,
  message: Message,
) => Promise<void | boolean>;