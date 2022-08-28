import * as logger from "../modules/heptagramLogger";

/**
 * Validates some important things that the bot needs to be able to run.
 *
 * @param {Heptagram} Heptagram's Discord instance.
 * @returns {object} Object containing a valid property as boolean, and a message as string.
 */
export const validateNode = (): { valid: boolean; message: string } => {
  try {
    if (Number(process.version.slice(1).split(".")[0]) < 16) {
      return {
        valid: false,
        message:
          "Node version is too low! It must be v16 or higher. Please upgrade it to continue.",
      };
    }

    return { valid: true, message: "Node ENV ok!" };
  } catch (err) {
    logger.error(`${err}`);
    return {
      valid: false,
      message: "Unknown error when validating environment",
    };
  }
};
