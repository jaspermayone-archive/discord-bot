/* eslint-disable no-param-reassign */

import util from "util";

/*
  MESSAGE CLEAN FUNCTION

  "Clean" removes @everyone pings, as well as tokens, and makes code blocks
  escaped so they're shown more easily. As a bonus it resolves promises
  and stringifies objects!
  This is mostly only used by the Eval and Exec commands.
*/
export async function msgClean(client, text) {
  if (text && text.constructor.name === "Promise") {
    text = await text;
  }
  if (typeof text !== "string") {
    text = util.inspect(text, { depth: 1 });
  }

  text = text
    .replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203));

  text = text.replaceAll(client.token, "[REDACTED]");

  return text;
}
