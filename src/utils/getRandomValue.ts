/**
 * Module to select a random value from the provided array.
 *
 * @template T
 * @param {Array<T>} array The array of items to choose from.
 * @returns {T} A random item from the array.
 */
export const getRandomValue = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};
