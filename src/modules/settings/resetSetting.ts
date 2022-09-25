import { defaultServer } from "../../config/database/defaultServer";
import { ServerConfig } from "../../interfaces/database/ServerConfig";
import { Heptagram } from "../../interfaces/Heptagram";
import { Settings } from "../../interfaces/settings/Settings";
import { heptagramErrorHandler } from "../heptagramErrorHandler";

/**
 * This will reset the given setting to the default value.
 *
 * @param {Heptagram} Heptagram Heptagram's Discord instance.
 * @param {string} serverID Discord ID of the server to modify settings for.
 * @param {string} serverName Name of that server.
 * @param {Settings} key The name of the setting to modify.
 * @param {ServerConfig} server The server configuration entry from the database.
 * @returns {ServerConfig | null} The server setting object, or null on error.
 */
export const resetSetting = async (
  Heptagram: Heptagram,
  serverID: string,
  serverName: string,
  key: Settings,
  server: ServerConfig
): Promise<ServerConfig | null> => {
  try {
    server.set(key, defaultServer[key]);
    server.markModified(key);
    await server.save();
    return server;
  } catch (err) {
    await heptagramErrorHandler(
      Heptagram,
      "reset setting module",
      err,
      serverName
    );
    return null;
  }
};
