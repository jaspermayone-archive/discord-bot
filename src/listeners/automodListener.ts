import { PermissionFlagsBits } from "discord.js";

import { Listener } from "../interfaces/listeners/Listener";
import { heptagramErrorHandler } from "../modules/heptagramErrorHandler";

import { automodLinks } from "./automod/automodLinks";

/**
 * Checks if the message content includes a link, and confirms that link
 * has not been set as allowed and the user does not have a link-permitted role.
 *
 * If the message fails these conditions, Heptagram deletes it.
 */
export const automodListener: Listener = {
  name: "automod",
  description: "Handles the automod logic",
  run: async (Heptagram, message, config) => {
    try {
      if (
        !config.automod_channels.includes(message.channel.id) &&
        !config.automod_channels.includes("all")
      ) {
        return;
      }

      if (config.no_automod_channels.includes(message.channel.id)) {
        return;
      }

      if (
        config.no_automod_channels.includes("all") &&
        !config.automod_channels.includes(message.channel.id)
      ) {
        return;
      }

      if (message.member?.permissions.has(PermissionFlagsBits.ManageMessages)) {
        return;
      }

      if (config.links === "on") {
        await automodLinks(Heptagram, message, config);
      }
    } catch (error) {
      await heptagramErrorHandler(
        Heptagram,
        "automod listener",
        error,
        message.guild?.name,
        message
      );
    }
  },
};
