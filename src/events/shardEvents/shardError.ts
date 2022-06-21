import { Heptagram } from "../../interfaces/Heptagram";
import { heptagramErrorHandler } from "../../utils/heptagramErrorHandler";

/**
 * Passes the shardError event to Heptagram's error handler.
 *
 * @param {Heptagram} Heptagram's Discord instance.
 * @param {Error} error Standard error object.
 * @param {number} shard The number of the shard that had an error.
 */
export const shardError = async (
  Heptagram: Heptagram,
  error: Error,
  shard: number
): Promise<void> => {
  await heptagramErrorHandler(Heptagram, `shard ${shard}`, error);
  Heptagram.pm2.metrics.events.mark();
};
