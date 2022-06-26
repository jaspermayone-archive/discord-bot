/**
 * Takes a number of seconds and parses it into a human readable
 * string, with the maximum unit being days.
 *
 * @param {number} seconds The number of seconds to parse.
 * @returns {string} A human-readable format of the number of seconds.
 */
export const parseSeconds = (seconds: number): string => {
  const days = seconds >= 86400 ? Math.floor(seconds / 86400) : 0;
  const hours =
    seconds >= 3600 ? Math.floor((seconds - days * 86400) / 3600) : 0;
  const minutes =
    seconds >= 60
      ? Math.floor((seconds - days * 86400 - hours * 3600) / 60)
      : 0;
  const secondsRemain = seconds - days * 86400 - hours * 3600 - minutes * 60;

  return `${days}d ${hours}h ${minutes}m ${secondsRemain}s`;
};
