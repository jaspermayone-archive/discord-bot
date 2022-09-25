import { Message, EmbedBuilder, PartialMessage, ChannelType } from "discord.js";

import { Heptagram } from "../../interfaces/Heptagram";
import { automodListener } from "../../listeners/automodListener";
import { heptagramErrorHandler } from "../../modules/heptagramErrorHandler";
import { getSettings } from "../../modules/settings/getSettings";
import { generateDiff } from "../../utils/generateDiff";

/**
 * Handles the messageUpdate event. Validates that the content in the message
 * changed, then sends an embed with the change details to the log channel.
 *
 * @param {Heptagram} Heptagram Heptagram's Discord instance.
 * @param {Message | PartialMessage} oldMessage Old message object.
 * @param {Message | PartialMessage} newMessage New message object.
 */
export const messageUpdate = async (
  Heptagram: Heptagram,
  oldMessage: Message | PartialMessage,
  newMessage: Message | PartialMessage
): Promise<void> => {
  try {
    const { author, guild, content: newContent } = newMessage;
    const { content: oldContent } = oldMessage;

    if (!guild || newMessage.channel.type === ChannelType.DM) {
      return;
    }

    const serverConfig = await getSettings(Heptagram, guild.id, guild.name);

    if (!serverConfig) {
      return;
    }

    if (oldContent && newContent && oldContent === newContent) {
      return;
    }

    if (!author || author.bot) {
      return;
    }

    const message = await newMessage.fetch();

    await automodListener.run(Heptagram, message, serverConfig);
    Heptagram.pm2.metrics.events.mark();
  } catch (err) {
    await heptagramErrorHandler(
      Heptagram,
      "message update event",
      err,
      oldMessage.guild?.name
    );
  }
};
