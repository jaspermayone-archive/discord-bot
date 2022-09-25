import { defaultServer } from "../../config/database/defaultServer";
import ServerModel from "../../database/models/ServerConfigModel";
import { ServerConfig } from "../../interfaces/database/ServerConfig";
import { Heptagram } from "../../interfaces/Heptagram";
import { heptagramErrorHandler } from "../heptagramErrorHandler";

/**
 * This utility fetches the server settings for the given ID from the
 * database. If the server does not have a record, it creates one with the
 * default values.
 *
 * @param {Heptagram} Heptagram Heptagram's Discord instance.
 * @param {string} serverID Discord ID of the server to get the settings for.
 * @param {string} serverName Name of the server.
 * @returns {ServerConfig | null} The server settings object, or null on error.
 */
export const getSettings = async (
  Heptagram: Heptagram,
  serverID: string,
  serverName: string
): Promise<ServerConfig | null> => {
  try {
    return (
      (await ServerModel.findOne({ serverID })) ||
      (await ServerModel.create({
        serverID,
        serverName,
        ...defaultServer,
      }))
    );
  } catch (err) {
    await heptagramErrorHandler(
      Heptagram,
      "get settings module",
      err,
      serverName
    );
    return null;
  }
};
