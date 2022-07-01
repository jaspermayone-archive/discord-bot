import { Message, MessageEmbed } from "discord.js";
import moment from "moment";

import { Heptagram } from "../../../interfaces/Heptagram";
import { heptagramErrorHandler } from "../../heptagramErrorHandler";
import { heptagramLogHandler } from "../../heptagramLogHandler";

/**
 * Reloads and restarts the bot.
 * @param {Heptagram} Heptagram's Discord instance.
 * @returns {boolean} True if the commands were registered, false on error.
 */
export const reboot = async (Heptagram: Heptagram, message: Message) => {
  try {
    heptagramLogHandler.log(
      `info`,
      `${message.author.username} has rebooted the bot.`
    );

    // set time to current time in unix
    const time = moment().unix();

    const embed = new MessageEmbed()
      .setColor(Heptagram.colors.error)
      .setTitle(
        `<:status_offline:951855000538206238> **Bot Restarting...** <:status_offline:951855000538206238>`
      )
      .setDescription(
        `The bot has been qued to restart by ${message.author.username} on <t:${time}>.`
      )
      .setTimestamp()
      .setFooter({
        text: `Message sent by Heptagram || ${Heptagram.version}`,
        iconURL: `${Heptagram.user?.avatarURL()}`,
      });

    (await Heptagram.debugHook.send({ embeds: [embed] })) &&
      message.reply({ embeds: [embed] }).then(() => {
        Heptagram.destroy();
        process.exit();
      });
  } catch (err) {
    await heptagramErrorHandler(
      Heptagram,
      "OWN reboot",
      err,
      message.guild?.name,
      message
    );
  }
};
