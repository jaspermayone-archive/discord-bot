import { EmbedBuilder, Guild } from "discord.js";

import { defaultServer } from "../../../config/database/defaultServer";
import { ServerConfig } from "../../../interfaces/database/ServerConfig";
import { Heptagram } from "../../../interfaces/Heptagram";
import { customSubstring } from "../../../utils/customSubstring";
import { heptagramErrorHandler } from "../../heptagramErrorHandler";

/**
 * Parses a server's settings into an embed describing the basic
 * global information.
 *
 * @param {Heptagram} Heptagram Heptagram's Discord instance.
 * @param {Guild} guild The server to parse the settings for.
 * @param {ServerConfig} config The server's configuration object from the database.
 * @returns {EmbedBuilder | null} A message embed or null on error.
 */
export const viewAutomodSettings = async (
  Heptagram: Heptagram,
  guild: Guild,
  config: ServerConfig
): Promise<EmbedBuilder | null> => {
  try {
    const settingsEmbed = new EmbedBuilder();
    settingsEmbed.setTitle(`${guild.name} Automod Settings`);
    settingsEmbed.setColor(Heptagram.colors.default);
    settingsEmbed.setDescription("These are the current automod settings.");
    settingsEmbed.addFields([
      {
        name: "Links",
        value: config.links || "off",
        inline: true,
      },
      {
        name: "Link Removal Message",
        value: customSubstring(
          config.link_message || defaultServer.link_message,
          1000
        ),
        inline: true,
      },
      {
        name: "Automod Channels",
        value: config.automod_channels.length.toString(),
        inline: true,
      },
      {
        name: "Non Automod Channels",
        value: config.no_automod_channels.length.toString(),
        inline: true,
      },
      {
        name: "Automod Roles",
        value: config.automod_roles.length.toString(),
        inline: true,
      },
      {
        name: "Allowed Links",
        value: config.allowed_links.length.toString(),
        inline: true,
      },
      {
        name: "Antiphishing",
        value: config.antiphish || "none",
        inline: true,
      },
    ]);
    settingsEmbed.setFooter({
      text: `Message sent by Heptagram || ${Heptagram.version}`,
      iconURL: `${Heptagram.user?.avatarURL()}`,
    });
    return settingsEmbed;
  } catch (err) {
    await heptagramErrorHandler(
      Heptagram,
      "view automod settings module",
      err,
      guild.name
    );
    return null;
  }
};
