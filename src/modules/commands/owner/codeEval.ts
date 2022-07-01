import { codeBlock } from "@discordjs/builders";
import { Message } from "discord.js";

import { Heptagram } from "../../../interfaces/Heptagram";
import { msgClean } from "../../../utils/msgClean";
import { heptagramErrorHandler } from "../../heptagramErrorHandler";

/**
 * Owner command for evaluating code.
 *
 * @param {Heptagram} Heptagram's discord instance.
 * @param {Message} message The message payload from Discord.
 */
export const codeEval = async (Heptagram: Heptagram, message: Message) => {
  try {
    const [, , code] = message.content.split(" ");
    const evaled = eval(code);
    const cleaned = await msgClean(Heptagram, evaled);

    if (!code) {
      await message.reply("No code provided.");
      return;
    }

    message.channel.send(codeBlock("js", cleaned));
  } catch (err) {
    await heptagramErrorHandler(
      Heptagram,
      "OWN codeEval",
      err,
      message.guild?.name,
      message
    );
  }
};
