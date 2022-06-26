import { MessageEmbed } from "discord.js";
import { connection } from "mongoose";

import { CommandHandler } from "../../../interfaces/commands/CommandHandler";
import { errorEmbedGenerator } from "../../../modules/errorEmbedGenerator";
import { heptagramErrorHandler } from "../../../modules/heptagramErrorHandler";

/**
 * Generates an embed with Heptagram's response time.
 */
export const handlePing: CommandHandler = async (
  Heptagram,
  interaction
): Promise<void> => {
  try {
    const receivedInteraction = Date.now();
    const { createdTimestamp } = interaction;

    const discordLatency = receivedInteraction - createdTimestamp;
    const websocketLatency = Heptagram.ws.ping;

    await connection.db.admin().ping();
    const databaseLatency = Date.now() - receivedInteraction;

    const isSlow =
      discordLatency > 100 || websocketLatency > 100 || databaseLatency > 100;

    const pingEmbed = new MessageEmbed();
    pingEmbed.setTitle("Heptagram's Response Time:");
    pingEmbed.setDescription(
      "The response time is calculated by the bot's components."
    );
    pingEmbed.addField("Discord:", `${discordLatency} ms`, true);
    pingEmbed.addField("Websocket:", `${websocketLatency} ms`, true);
    pingEmbed.addField("Database:", `${databaseLatency} ms`, true);
    pingEmbed.setColor(
      isSlow ? Heptagram.colors.error : Heptagram.colors.success
    );

    await interaction.editReply({ embeds: [pingEmbed] });
  } catch (err) {
    const errorId = await heptagramErrorHandler(
      Heptagram,
      "ping command",
      err,
      interaction.guild?.name,
      undefined,
      interaction
    );
    await interaction.editReply({
      embeds: [errorEmbedGenerator(Heptagram, "ping", errorId)],
    });
  }
};
