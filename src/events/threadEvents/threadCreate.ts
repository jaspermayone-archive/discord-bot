import { ThreadChannel } from "discord.js";

import { Heptagram } from "../../interfaces/Heptagram";
import { heptagramErrorHandler } from "../../utils/heptagramErrorHandler";

/**
 * When a new thread is created, it joins
 * the thread automatically, to ensure Heptagram is available for all needs.
 *
 * @param {Heptagram} Heptagram's Discord instance.
 * @param {ThreadChannel} thread The channel object representing the new thread.
 */
export const threadCreate = async (
  Heptagram: Heptagram,
  thread: ThreadChannel
): Promise<void> => {
  try {
    if (thread.joinable) {
      await thread.join();
    }
  } catch (err) {
    await heptagramErrorHandler(Heptagram, "thread create event", err);
  }
};
