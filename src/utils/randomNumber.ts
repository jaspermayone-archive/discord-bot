/**
 * gets a random number between min and max
 *
 * @param {number} min
 * @param {number} max
 * @returns {number} A human-readable format of the number of seconds.
 */
export const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};
