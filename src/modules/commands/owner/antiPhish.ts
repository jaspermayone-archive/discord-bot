import axios from "axios";
import { Message } from "discord.js";

import { Heptagram } from "../../../interfaces/Heptagram";
import { heptagramErrorHandler } from "../../heptagramErrorHandler";

/**
 * Owner command for flagging new scam domains.
 *
 * @param {Heptagram} Heptagram's discord instance.
 * @param {Message} message The message payload from Discord.
 */
export const antiPhish = async (Heptagram: Heptagram, message: Message) => {
  try {
    const [, , link] = message.content.split(" ");

    if (!link) {
      return message.reply("Please provide a link to check.");
    }

    const heptagramResult = await axios.post<boolean>(
      `http://api.heptagrambotproject.com/v4/api/scam/link/report?url=${link}`,
      {
        headers: {
          Authorization: "Bearer " + Heptagram.configs.heptagramApiToken,
        },
        body: {
          link: link,
          reportedby: `${message.author.id} || Heptagram Bot`,
        },
      }
    );

    await message.reply(
      `I have reported that domain! Here's the result:\n${JSON.stringify({
        heptagram: heptagramResult.data,
      })}`
    );
  } catch (err) {
    await heptagramErrorHandler(
      Heptagram,
      "OWN antiphish",
      err,
      message.guild?.name,
      message
    );
  }
};
