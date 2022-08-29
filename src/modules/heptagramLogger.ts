import colors from "colors";
import moment from "moment";

export const log = (
  content: string,
  type: "log" | "info" | "warn" | "error" | "debug" | "load" | "ready" = "log"
) => {
  const timestamp = `${colors.white(`[${moment().format("DD-MM-YY H:m:s")}]`)}`;

  switch (type) {
    case "log":
      return console.log(`${colors.grey("[LOG]")} ${timestamp} ${content}`);
    case "info":
      return console.log(
        `${colors.cyan("[INFO]")} ${timestamp} ${colors.cyan(content)}`
      );
    case "warn":
      return console.log(
        `${colors.yellow("[WARN]")} ${timestamp} ${colors.yellow(content)} `
      );
    case "error":
      return console.log(
        `${colors.red("[ERROR]")} ${timestamp} ${colors.red(content)} `
      );
    case "debug":
      return console.log(
        `${colors.magenta("[DEBUG]")}  ${timestamp} ${colors.magenta(content)} `
      );
    case "load": {
      return console.log(
        `${timestamp} ${colors.magenta(type.toUpperCase())} ${content} `
      );
    }
    case "ready":
      return console.log(
        `${colors.green("[READY]")}  ${timestamp} ${colors.green(content)}`
      );
    default:
      throw new TypeError("Logger type not correct.");
  }
};

export const info = (content: string) => log(content, "info");
export const warn = (content: string) => log(content, "warn");
export const error = (content: string) => log(content, "error");
export const debug = (content: string) => log(content, "debug");
export const load = (content: string) => log(content, "load");
export const ready = (content: string) => log(content, "ready");
