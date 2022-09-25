import { Heptagram } from "../../interfaces/Heptagram";
import { Settings } from "../../interfaces/settings/Settings";
import { heptagramErrorHandler } from "../heptagramErrorHandler";

/**
 * Renders a server setting's value into a string in the format that Discord
 * expects - allows for clean formatting of roles and channels.
 *
 * @param {Heptagram} Heptagram Heptagram's Discord instance.
 * @param {Settings} key The setting to render.
 * @param {string} value That setting's value.
 * @returns {string} The parsed value.
 */
export const renderSetting = (
  Heptagram: Heptagram,
  key: Settings,
  value: string
): string => {
  try {
    if (!value) {
      return "No value set.";
    }
    switch (key) {
      case "allowed_links":
      case "link_message":
      case "links":
      case "antiphish":
      case "blocked":
        return `<@!${value}>`;
      case "automod_roles":
      case "automod_channels":
      case "no_automod_channels":
      default:
        return "Something went wrong with rendering this setting.";
    }
  } catch (err) {
    void heptagramErrorHandler(Heptagram, "render setting module", err);
    return "Something went wrong with rendering this setting.";
  }
};
