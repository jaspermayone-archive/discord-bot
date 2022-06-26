import { diffSentences } from "diff";

/**
 * Module to generate a diff string from two strings.
 *
 * @param {string} old The old string.
 * @param {string} new_ The new string.
 * @returns {string} The diff string, formatted.
 */
export const generateDiff = (old: string, new_: string): string => {
  return diffSentences(old, new_)
    .map((el) =>
      el.added ? `+ ${el.value}` : el.removed ? `- ${el.value}` : ""
    )
    .filter((el) => el)
    .join("\n");
};
