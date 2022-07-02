import * as child from "child_process";

import { Heptagram } from "../interfaces/Heptagram";
import { heptagramLogHandler } from "../modules/heptagramLogHandler";

/**
 * Validates that all expected environment variables are set with *some* value.
 * Does not validate that the values are valid. Constructs a config object and
 * attaches it to Heptagram's client instance. Also constructs the colours and responses objects
 * and attaches them.
 *
 * @param {Heptagram} Heptagram's Discord instance.
 * @returns {object} Object containing a valid property as boolean, and a message as string.
 */
export const validateEnv = (
  Heptagram: Heptagram
): { valid: boolean; message: string } => {
  try {
    if (!process.env.NODE_ENV) {
      return { valid: false, message: "Missing Node Env" };
    }

    if (!process.env.DISCORD_TOKEN) {
      return { valid: false, message: "Missing Discord Token" };
    }

    if (!process.env.WH_URL) {
      return { valid: false, message: "Missing Discord webhook URL" };
    }

    if (!process.env.MONGO_URI) {
      return { valid: false, message: "Missing Database Connection URI" };
    }

    if (!process.env.TEST_GUILD_ID) {
      return { valid: false, message: "Missing Test Guild ID" };
    }

    if (!process.env.HOME_GUILD_ID) {
      return { valid: false, message: "Missing Home Guild ID" };
    }

    if (!process.env.HEPTAGRAM_API_TOKEN) {
      return { valid: false, message: "Missing Heptagram API Token" };
    }

    if (!process.env.CATS_API_KEY) {
      return { valid: false, message: "Missing Cats API Key" };
    }

    if (!process.env.OWNER_ID) {
      return { valid: false, message: "Missing Owner ID" };
    }

    if (!process.env.HEPTAGRAM_LOVE) {
      return { valid: false, message: "Missing Heart Emoji" };
    }

    if (!process.env.CLIENT_ID) {
      return { valid: false, message: "Missing Client ID" };
    }

    Heptagram.commitHash = child
      .execSync("git rev-parse HEAD")
      .toString()
      .trim();

    Heptagram.version = `v${process.env.npm_package_version}`;

    const configs: Heptagram["configs"] = {
      nodeEnv: process.env.NODE_ENV,
      token: process.env.DISCORD_TOKEN,
      id: process.env.CLIENT_ID,
      ownerId: process.env.OWNER_ID,
      whUrl: process.env.WH_URL,
      mongoUri: process.env.MONGO_URI,
      testGuildId: process.env.TEST_GUILD_ID,
      homeGuildId: process.env.HOME_GUILD_ID,
      version: Heptagram.version || "null",
      love: process.env.HEPTAGRAM_LOVE,
      yes: "✅",
      no: "❌",
      think: "🤔",
    };

    const tokens: Heptagram["tokens"] = {
      heptagramApiToken: process.env.HEPTAGRAM_API_TOKEN,
      catsApiKey: process.env.CATS_API_KEY,
    };

    Heptagram.colors = {
      default: 0xfff826,
      success: 0x33b679,
      warning: 0xc27c0e,
      error: 0x992d22,
    };
    Heptagram.configs = configs;
    Heptagram.tokens = tokens;

    Heptagram.usersToHeart = [`${Heptagram.configs.ownerId}`];

    return { valid: true, message: "Environment variables validated!" };
  } catch (err) {
    heptagramLogHandler.log("error", err);
    return {
      valid: false,
      message: "Unknown error when validating environment",
    };
  }
};
