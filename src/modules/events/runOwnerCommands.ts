import { Message } from "discord.js";

import { Heptagram } from "../../interfaces/Heptagram";
import { antiPhish } from "../commands/owner/antiPhish";
import { registerCommands } from "../commands/owner/registerCommands";
import { unregisterCommand } from "../commands/owner/unregisterCommand";
import { viewCommands } from "../commands/owner/viewCommands";

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
  const [, command] = message.content.split(" ");

  switch (command) {
    case "register":
      await registerCommands(Heptagram);
      await message.reply(
        `<a:verifyblack:951863095238754324> All commands deployed <@${message.author.id}>! <a:verifyblack:951863095238754324>`
      );
      break;
    case "unregister":
      await unregisterCommand(Heptagram, message);
      break;
    case "view":
      await viewCommands(Heptagram, message);
      break;
    case "phish":
      await antiPhish(Heptagram, message);
      break;
    default:
      await message.reply("No command found.");
  }
};
