import { ServerConfig } from "../../interfaces/database/ServerConfig";
import { Heptagram } from "../../interfaces/Heptagram";
import { Settings } from "../../interfaces/settings/Settings";
import { heptagramErrorHandler } from "../heptagramErrorHandler";
import * as logger from "../heptagramLogger";

/**
 * This handles all of the logic for setting a server's config. Depending on
 * the type of the data stored, it will handle the array or string logic
 * as necessary.
 *
 * @param {Heptagram} Heptagram Heptagram's Discord instance.
 * @param {string} serverID The ID of the server to modify settings for.
 * @param {string} serverName The current name of the server.
 * @param {Settings} key The name of the setting to modify.
 * @param {string} value The value to change the setting to.
 * @param {ServerConfig} server The server config entry in the database.
 * @returns {ServerConfig | null} ServerModel on success and null on error.
 */
export const setSetting = async (
  Heptagram: Heptagram,
  serverID: string,
  serverName: string,
  key: Settings,
  value: string,
  server: ServerConfig
): Promise<ServerConfig | null> => {
  try {
    const parsedValue = value.replace(/\D/g, "");

    switch (key) {
      case "automod_channels":
      case "no_automod_channels":
        if (value === "all") {
          server[key] = ["all"];
          break;
        }
        if (server[key].includes(parsedValue)) {
          const index = server[key].indexOf(parsedValue);
          server[key].splice(index, 1);
        } else {
          server[key].push(parsedValue);
        }
        server.markModified(key);
        break;
      case "blocked":
      case "automod_roles":
      case "allowed_links":
        if (server[key].includes(value)) {
          const index = server[key].indexOf(value);
          server[key].splice(index, 1);
        } else {
          server[key].push(value);
        }
        server.markModified(key);
        break;
      case "link_message":
      case "links":
      case "antiphish":
        server[key] = value as "none" | "mute" | "kick" | "ban";
        break;
      default:
        logger.error("the setSettings logic broke horribly.");
    }

    await server.save();
    return server;
  } catch (err) {
    await heptagramErrorHandler(
      Heptagram,
      "set setting module",
      err,
      serverName
    );
    return null;
  }
};
