import { readdir } from "fs/promises";
import { join } from "path";

import { Context } from "../../interfaces/contexts/Context";
import { Heptagram } from "../../interfaces/Heptagram";

import { heptagramErrorHandler } from "../heptagramErrorHandler";

/**
 * Reads the `/contexts` directory and dynamically imports the files,
 * then pushes the imported data to an array.
 *
 * @param {Heptagram} Heptagram's Discord instance.
 * @returns {Context[]} Array of Context objects representing the imported commands.
 */
export const loadContexts = async (
  Heptagram: Heptagram
): Promise<Context[]> => {
  try {
    const result: Context[] = [];
    const files = await readdir(
      join(process.cwd(), "src", "contexts"),
      "utf-8"
    );
    for (const file of files) {
      const name = file.split(".")[0];
      const mod = await import(join(process.cwd(), "src", "contexts", file));
      result.push(mod[name] as Context);
    }
    return result;
  } catch (err) {
    await heptagramErrorHandler(Heptagram, "slash command loader", err);
    return [];
  }
};
