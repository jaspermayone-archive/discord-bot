/* eslint-disable no-param-reassign */
import util from "util";

import { Heptagram } from "../interfaces/Heptagram";

/**
 * A simple text cleaner. This removes `@everyone` pings, as well as tokens, and makes code blocks
 * escaped so they're shown more easily. As a bonus it resolves promises
 * and stringifies objects!
 * This is mostly only used by the Eval and Exec commands.
 *
 * @param {string} text - Text to clean
 * @param {Heptagram} Heptagram, Heptagram's Discord instance.
 * @returns {string} Cleaned text
 * @example
 * import { clean } from './utils/misc';
 *
 * const code: string = args.join(', ');
 * const evaled = await eval(code);
 *
 * console.log(clean(evaled));
 */
export async function msgClean(Heptagram: Heptagram, text) {
  if (text && text.constructor.name === "Promise") {
    text = await text;
  }
  if (typeof text !== "string") {
    text = util.inspect(text, { depth: 1 });
  }

  text = text
    .replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203));

  text = text.replaceAll(Heptagram.token, "[TOKEN REDACTED]");

  return text;
}
