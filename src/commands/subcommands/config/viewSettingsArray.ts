import { EmbedBuilder } from "discord.js";

import { ServerConfig } from "../../../interfaces/database/ServerConfig";
import { Heptagram } from "../../../interfaces/Heptagram";
import { ArraySettings } from "../../../interfaces/settings/ArraySettings";
import { heptagramErrorHandler } from "../../../modules/heptagramErrorHandler";
import { renderSetting } from "../../../modules/settings/renderSetting";

/**
 * Parses a settings array into a paginated embed, with array values
 * stored in the description separated by new lines.
 *
 * @param {Heptagram} Heptagram Heptagram's Discord instance.
 * @param {ServerConfig} config The server's settings from the database.
 * @param {ArraySettings} setting The setting to be parsed.
 * @param {number} page The page number for the current embed.
 * @returns {EmbedBuilder | null} The parsed embed, or null on error.
 */
export const viewSettingsArray = async (
  Heptagram: Heptagram,
  config: ServerConfig,
  setting: ArraySettings,
  page: number
): Promise<EmbedBuilder | null> => {
  try {
    const data = config[setting];

    const settingEmbed = new EmbedBuilder();
    settingEmbed.setTitle(`Server Settings: ${setting}`);
    settingEmbed.setTimestamp();
    settingEmbed.setColor(Heptagram.colors.default);

    if (!data || !data.length) {
      settingEmbed.setDescription("No values set.");
      settingEmbed.setFooter({
        text: `Page ${page} of unknown`,
      });
      return settingEmbed;
    }

    const pages = Math.ceil(data.length / 10);
    const paginatedData = data
      .slice(page * 10 - 10, page * 10)
      .map((el) => renderSetting(Heptagram, setting, el));

    settingEmbed.setDescription(paginatedData.join("\n"));
    settingEmbed.setFooter({
      text: `Page ${page} of ${pages}`,
    });
    return settingEmbed;
  } catch (err) {
    await heptagramErrorHandler(Heptagram, "view settings array module", err);
    return null;
  }
};
