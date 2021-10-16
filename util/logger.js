/*
Logger class for easy and aesthetically pleasing console logging 
*/
const {
    black, red, green, yellow, blue, magenta, cyan, white, grey, 
    redBright, greenBright, yellowBright, blueBright, magentaBright, cyanBright, whiteBright,
    bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite, bgGrey,
    bgRedBright, bgGreenBright, bgYellowBright, bgBlueBright, bgMagentaBright, bgCyanBright, bgWhiteBright
} = require("chalk");

const chalk = require("chalk");

const { Timestamp } = require("@sapphire/time-utilities");

exports.log = (content, type = "log") => {
  const timestamp = `[${white(new Timestamp("YYYY-MM-DD HH:mm:ss"))}]:`;
  
  switch (type) {
    case "log": return console.log(`${timestamp} ${grey(type.toUpperCase())} ${content} `);
    case "warn": return console.log(`${timestamp} ${yellow(type.toUpperCase())} ${content} `);
    case "error": return console.log(`${timestamp} ${red(type.toUpperCase())} ${content} `);
    case "debug": return console.log(`${timestamp} ${magenta(type.toUpperCase())} ${content} `);
    case "ready": return console.log(`${timestamp} ${green(content)}`);
    case "mongo": return console.log(`${timestamp} ${cyan(type.toUpperCase())} ${content}`);
    case "heptagram": return console.log(`${timestamp} ${chalk.hex('#FFF800')(`${content}`)}`);
    default: throw new TypeError("Logger type not correct.");
  }
}; 

exports.warn = (...args) => this.log(...args, "warn");
exports.error = (...args) => this.log(...args, "error");
exports.debug = (...args) => this.log(...args, "debug");
exports.ready = (...args) => this.log(...args, "ready");
exports.mongo = (...args) => this.log(...args, "mongo");
exports.heptagram = (...args) => this.log(...args, "heptagram");