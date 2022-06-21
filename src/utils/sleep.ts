/**
 * Helper function to pause the operation of an async function for a
 * given amount of time.
 *
 * @param {number} milliseconds Time, in milliseconds, to pause.
 * @returns {Promise<void>} Promise that resolves after the given time.
 */
export const sleep = async (milliseconds: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
};
