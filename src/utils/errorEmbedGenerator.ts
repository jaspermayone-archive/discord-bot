import { MessageEmbed } from "discord.js";
import { Types } from "mongoose";

import { Heptagram } from "../interfaces/Heptagram";

/**
 * Generates an embed containing a unique ID for an error and instructions for
 * joining the support server and requesting assistance.
 *
 * @param {BeccaLyria} Heptagram's Discord instance.
 * @param {string} commandName The name of the command that generated the error.
 * @param {Types.ObjectId} errorId The unique ID for the error.
 * @returns {MessageEmbed} The Discord embed containing the information.
 */
export const errorEmbedGenerator = (
  Heptagram: Heptagram,
  commandName: string,
  errorId: Types.ObjectId
): MessageEmbed => {
  const errorEmbed = new MessageEmbed();
  errorEmbed.setColor(Heptagram.colors.error);
  errorEmbed.setTitle("An error has occurred!");
  errorEmbed.setDescription(
    `Something has gone wrong with the ${commandName} command.`
  );
  errorEmbed.addField(
    "How to report this error",
    "To fix this error, please join the support server and provide the error ID from bellow, as well as any other relevant information."
  );
  errorEmbed.addField("Error ID:", errorId.toHexString());
  errorEmbed.setTimestamp();
  return errorEmbed;
};
