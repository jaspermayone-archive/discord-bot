import { Listener } from "../interfaces/listeners/Listener";
import { heptagramErrorHandler } from "../utils/heptagramErrorHandler";

/**
 * Checks the server settings to see if the user that sent the message
 * is configured to receive a heart reaction. If so, reacts.
 *
 */
export const heartsListener: Listener = {
  name: "Hearts Listener",
  description: "Adds heart reactions to specified users.",
  run: async (Heptagram, message) => {
    try {
      const { author } = message;
      const usersToHeart = Heptagram.usersToHeart;

      if (usersToHeart.includes(author.id)) {
        await message
          .react(Heptagram.configs.love)
          .catch(async () => await message.react("❌"));
      }
    } catch (err) {
      await heptagramErrorHandler(
        Heptagram,
        "hearts listener",
        err,
        message.guild?.name,
        message
      );
    }
  },
};
