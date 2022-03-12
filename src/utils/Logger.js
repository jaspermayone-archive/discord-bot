const {
  black, red, green, yellow, blue, magenta, cyan, white, grey, 
  redBright, greenBright, yellowBright, blueBright, magentaBright, cyanBright, whiteBright,
  bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite, bgGrey,
  bgRedBright, bgGreenBright, bgYellowBright, bgBlueBright, bgMagentaBright, bgCyanBright, bgWhiteBright
} = require ("chalk");

const chalk = require ("chalk");
const { Timestamp } = require ("@sapphire/time-utilities");

exports.log = (content, type = "log") => {
const timestamp = `${white(new Timestamp("YYYY-MM-DD HH:mm:ss"))}]:`;

switch (type) {
  case "log": return console.log(`${grey("[LOG]")} ${timestamp} ${content}`);
  case "info": return console.log(`${blueBright("[INFO]")} ${timestamp} ${blueBright(content)}`);
  case "warn": return console.log(`${yellow("[WARN]")} ${timestamp} ${content} `);
  case "error": return console.log(`${red("[ERROR]")} ${timestamp} ${content} `);
  case "debug": return console.log(`${magenta("[DEBUG]")}  ${timestamp} ${content} `);
  case "ready": return console.log(`${green("[READY]")}  ${timestamp} ${green(content)}`);
  case "mongo": return console.log(`${cyan("[MONGO]")} ${timestamp} ${content}`);
  case "heptagram": return console.log(`${chalk.hex('#FFF800')("[HEPTAGRAM]")}  ${timestamp}  ${chalk.hex('#FFF800')(`${content}`)}`);
  case "shard": return console.log(`${chalk.hex('#ff7557')("[SHARD]")}  ${timestamp}  ${chalk.hex('#ff7557')(`${content}`)}`);
  default: throw new TypeError("Logger type not correct.");
}
}; 

exports.info = (...args) => this.log(...args, "info");
exports.warn = (...args) => this.log(...args, "warn");
exports.error = (...args) => this.log(...args, "error");
exports.debug = (...args) => this.log(...args, "debug");
exports.ready = (...args) => this.log(...args, "ready");
exports.mongo = (...args) => this.log(...args, "mongo");
exports.heptagram = (...args) => this.log(...args, "heptagram");
exports.shard = (...args) => this.log(...args, "shard");