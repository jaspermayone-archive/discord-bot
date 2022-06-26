import { Message } from "discord.js";

import { Heptagram } from "../../interfaces/Heptagram";
import { registerCommands } from "../commands/registerCommands";

/**
 * Wrapper to handle the owner-only commands.
 *
 * @param {Heptagram} Heptagram's Discord instance.
 * @param {Message} message The message object from Discord.
 */
export const runOwnerCommands = async (
  Heptagram: Heptagram,
  message: Message
) => {
  await message.reply("Hey there! :wave:");
  const [, command] = message.content.split(" ");

  switch (command) {
    case "register":
      await registerCommands(Heptagram);
      break;
    default:
      await message.reply("No command found.");
  }
};
