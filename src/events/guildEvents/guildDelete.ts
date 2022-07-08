import { Guild, MessageEmbed } from "discord.js";

import { Heptagram } from "../../interfaces/Heptagram";

/**
 * Sends a notification to the debug hook when Heptagram leaves a server.
 *
 * @param {Heptagram} Heptagram Heptagram's Discord instance.
 * @param {Guild} guild The guild object representing the server Heptagram was removed from.
 */
export const guildDelete = async (
  Heptagram: Heptagram,
  guild: Guild
): Promise<void> => {
  const owner = await guild.members.fetch(guild.ownerId).catch(() => null);
  const guildDeleteEmbed = new MessageEmbed();
  guildDeleteEmbed.setTitle(
    `${Heptagram.user?.username || "Heptagram"} has left a guild...`
  );
  guildDeleteEmbed.addField("Guild Name", guild.name, true);
  guildDeleteEmbed.addField(
    "Guild Owner",
    owner?.user.username || "No owner data available.",
    true
  );
  guildDeleteEmbed.addField("Guild ID", guild.id, true);
  guildDeleteEmbed.addField(
    "Guild Owner ID",
    guild.ownerId || "No owner data available",
    true
  );
  guildDeleteEmbed.setColor(Heptagram.colors.warning);
  guildDeleteEmbed.setTimestamp();

  await Heptagram.debugHook.send({ embeds: [guildDeleteEmbed] });

  Heptagram.pm2.metrics.guilds.set(Heptagram.pm2.metrics.guilds.val() - 1);
  Heptagram.pm2.metrics.events.mark();
};
