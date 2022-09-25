/* eslint-disable no-case-declarations */
import { Guild } from "discord.js";

import { ServerConfig } from "../../interfaces/database/ServerConfig";
import { Heptagram } from "../../interfaces/Heptagram";
import { Settings } from "../../interfaces/settings/Settings";
import { heptagramErrorHandler } from "../heptagramErrorHandler";

/**
 * Validates that a setting is in the correct format. Confirms that channels exist,
 * members are in the server, etc.
 *
 * @param {Heptagram} Heptagram Heptagram's Discord instance.
 * @param {Settings} setting The name of the setting to validate.
 * @param {string} value The value to confirm is valid.
 * @param {Guild} guild The guild object to modify the settings for.
 * @param {ServerConfig} config The server config object from the database.
 * @returns {boolean} True if the setting is valid, false if not.
 */
export const validateSetting = async (
  Heptagram: Heptagram,
  setting: Settings,
  value: string,
  guild: Guild,
  config: ServerConfig
): Promise<boolean> => {
  try {
    const parsedValue = BigInt(value.replace(/\D/g, ""));
    switch (setting) {
      case "links":
        if (parsedValue < 0) {
          return false;
        } else {
          return true;
        }
      case "blocked":
        return (
          !!parsedValue &&
          !!(
            (await guild.members.fetch(`${parsedValue}`)) ||
            config[setting].includes(`${parsedValue}`)
          )
        );
      case "automod_roles":
        return (
          !!parsedValue &&
          (!!(await guild.roles.fetch(`${parsedValue}`)) ||
            config[setting].includes(`${parsedValue}`))
        );
      case "automod_channels":
        return (
          !!parsedValue &&
          (!!(await guild.channels.fetch(`${parsedValue}`)) ||
            config[setting].includes(`${parsedValue}`))
        );
      case "no_automod_channels":
        return (
          !!parsedValue &&
          (!!(await guild.channels.fetch(`${parsedValue}`)) ||
            config[setting].includes(`${parsedValue}`))
        );
      case "allowed_links":
        return (
          !!parsedValue &&
          (!!(await guild.channels.fetch(`${parsedValue}`)) ||
            config[setting].includes(`${parsedValue}`))
        );
      case "antiphish":
        return (
          !!parsedValue &&
          (!!(await guild.channels.fetch(`${parsedValue}`)) ||
            config[setting].includes(`${parsedValue}`))
        );
      case "link_message":
        return (
          !!parsedValue &&
          (!!(await guild.channels.fetch(`${parsedValue}`)) ||
            config[setting].includes(`${parsedValue}`))
        );
      default:
        return false;
    }
  } catch (err) {
    await heptagramErrorHandler(
      Heptagram,
      "validate setting module",
      err,
      guild.name
    );
    return false;
  }
};
