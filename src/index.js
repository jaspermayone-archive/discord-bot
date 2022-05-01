if (Number(process.version.slice(1).split(".")[0]) < 16)
  throw new Error(
    "Node 16.x or higher is required. Update Node on your system."
  );

const { Client, Collection } = require("discord.js");
const { mongoose } = require("mongoose");
const { readdirSync } = require("fs");
const { readFile } = require("fs/promises")

const { configJSON } = require("./config/config.json");
const { intents, partials, permLevels } = require("./config/intents.js");
require("dotenv").config();

const logger = require("./utils/Logger.js");
const { version } = require("../package.json");
const mongo = require("./mongo.js");

const client = new Client({
  intents,
  partials,
});

const commands = new Collection();
const aliases = new Collection();
const slashcmds = new Collection();

logger.heptagram("Starting Heptagram || Version: " + version);

const levelCache = {};
for (let i = 0; i < permLevels.length; i++) {
  const thisLevel = permLevels[i];
  levelCache[thisLevel.name] = thisLevel.level;
}

client.container = {
  commands,
  aliases,
  slashcmds,
  levelCache,
};

const init = async () => {
  // load commands from ./commands

  const commands = readdirSync("./commands").filter((file) =>
    file.endsWith(".js")
  );
  for (const file of commands) {
    const props = require(`./commands/${file}`);
    //  logger.log(`Loading Command: ${props.help.name}. 👌`, "log");
    client.container.commands.set(props.help.name, props);
    props.conf.aliases.forEach((alias) => {
      client.container.aliases.set(alias, props.help.name);
    });
  }

  const slashFiles = readdirSync("./slash").filter((file) =>
    file.endsWith(".js")
  );
  for (const file of slashFiles) {
    const command = require(`./slash/${file}`);
    const commandName = file.split(".")[0];
    client.container.slashcmds.set(command.commandData.name, command);
    //  logger.log(`Loading Slash command: ${commandName}. 👌`, "log");
  }

  const eventFiles = readdirSync("./events/").filter((file) =>
    file.endsWith(".js")
  );
  for (const file of eventFiles) {
    const eventName = file.split(".")[0];
    // logger.log(`Loading Event: ${eventName}. 👌`, "log");
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
  }

  // needs to be tested
  client.config = require("./config/config.json");
  client.intents = require("./config/intents.js");
  client.env = process.env;

  client.login(client.env.DISCORD_TOKEN);

const express = require("express");
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(8000, () => console.log('Ping! Express running on port 8000'));


if (process.env.NODE_ENV === "production") {

  const https = require("https");

  const privateKey = await readFile(
    "/etc/letsencrypt/live/example.com/privkey.pem",
    "utf8"
  );
  const certificate = await readFile(
    "/etc/letsencrypt/live/example.com/cert.pem",
    "utf8"
  );
  const ca = await readFile(
    "/etc/letsencrypt/live/example.com/chain.pem",
    "utf8"
  );

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };

  const httpsServer = https.createServer(credentials, app);

  httpsServer.listen(443, () => {
    logHandler.log("http", "https server listening on port 443");
  });
};

};

init();
