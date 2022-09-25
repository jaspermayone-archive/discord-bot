import { Guild, EmbedBuilder } from "discord.js";

import { ServerConfig } from "../../interfaces/database/ServerConfig";
import { Heptagram } from "../../interfaces/Heptagram";
import { heptagramErrorHandler } from "../heptagramErrorHandler";

/**
 * Parses a server's settings into an embed describing the basic
 * global information.
 *
 * @param {Heptagram} Heptagram Heptagram's Discord instance.
 * @param {Guild} guild The server to parse the settings for.
 * @param {ServerConfig} config The server's configuration object from the database.
 * @returns {EmbedBuilder | null} A message embed or null on error.
 */
export const viewSettings = async (
  Heptagram: Heptagram,
  guild: Guild,
  config: ServerConfig
): Promise<EmbedBuilder | null> => {
  try {
    const settingsEmbed = new EmbedBuilder();
    settingsEmbed.setTitle(`Settings for ${guild.name}`);
    settingsEmbed.setColor(Heptagram.colors.default);
    settingsEmbed.setDescription(
      `These are the current settings for ${guild.name}.`
    );
    settingsEmbed.addFields([
      {
        name: "# of Blocked Users",
        value: config.blocked.length.toString(),
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
      "view settings module",
      err,
      guild.name
    );
    return null;
  }
};
