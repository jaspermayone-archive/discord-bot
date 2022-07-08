import { Guild, MessageEmbed } from "discord.js";

import { Heptagram } from "../../interfaces/Heptagram";

/**
 * Generates an embed when Heptagram joins a guild and sends it to the debug hook.
 *
 * @param {Heptagram} Heptagram Heptagram's Discord instance.
 * @param {Guild} guild The guild object for the server Heptagram joined.
 */
export const guildCreate = async (
  Heptagram: Heptagram,
  guild: Guild
): Promise<void> => {
  const owner = await guild.members.fetch(guild.ownerId);
  const guildCreateEmbed = new MessageEmbed();
  guildCreateEmbed.setTitle(
    `${Heptagram.user?.username || "Heptagram"} has joined a new guild`
  );
  guildCreateEmbed.addField("Guild Name", guild.name, true);
  guildCreateEmbed.addField(
    "Guild Owner",
    owner.user.username || "No owner data available.",
    true
  );
  guildCreateEmbed.addField("Guild ID", guild.id, true);
  guildCreateEmbed.addField(
    "Guild Owner ID",
    owner.id || "No owner data available",
    true
  );
  guildCreateEmbed.setColor(Heptagram.colors.success);
  guildCreateEmbed.setTimestamp();

  await Heptagram.debugHook.send({ embeds: [guildCreateEmbed] });

  Heptagram.pm2.metrics.guilds.set(Heptagram.pm2.metrics.guilds.val() + 1);
  Heptagram.pm2.metrics.events.mark();
};
