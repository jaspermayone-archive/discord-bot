import chalk from "chalk";
import moment from "moment";

export const log = (
  content: string,
  type:
    | "log"
    | "info"
    | "warn"
    | "error"
    | "debug"
    | "load"
    | "ready"
    | "mongo"
    | "heptagram" = "log"
) => {
  const timestamp = `${chalk.white(`[${moment().format("DD-MM-YY H:m:s")}]`)}`;

  switch (type) {
    case "log":
      return console.log(`${chalk.grey("[LOG]")} ${timestamp} ${content}`);
    case "info":
      return console.log(
        `${chalk.blueBright("[INFO]")} ${timestamp} ${chalk.blueBright(
          content
        )}`
      );
    case "warn":
      return console.log(
        `${chalk.yellow("[WARN]")} ${timestamp} ${chalk.yellow(content)} `
      );
    case "error":
      return console.log(
        `${chalk.red("[ERROR]")} ${timestamp} ${chalk.red(content)} `
      );
    case "debug":
      return console.log(
        `${chalk.blueBright("[DEBUG]")}  ${timestamp} ${chalk.magenta(
          content
        )} `
      );
    case "load": {
      return console.log(
        `${timestamp} ${chalk.magenta(type.toUpperCase())} ${content} `
      );
    }
    case "ready":
      return console.log(
        `${chalk.green("[READY]")}  ${timestamp} ${chalk.green(content)}`
      );
    case "mongo":
      return console.log(
        `${chalk.hex("#f1421a")("[MONGO]")} ${timestamp} ${chalk.hex("#f1421a")(
          content
        )}`
      );
    case "heptagram":
      return console.log(
        `${chalk.hex("#FFF800")("[HEPTAGRAM]")}  ${timestamp}  ${chalk.hex(
          "#FFF800"
        )(`${content}`)}`
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
export const mongo = (content: string) => log(content, "mongo");
export const heptagram = (content: string) => log(content, "heptagram");
