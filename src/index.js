if (Number(process.version.slice(1).split(".")[0]) < 16)
  throw new Error(
    "Node 16.x or higher is required. Update Node on your system."
  );

const { Client, Collection } = require ("discord.js");
const { readdirSync } = require ("fs");

const { configJSON } = require ("./config/config.json");
const { intents, partials, permLevels } = require ("./config/intents.js");
require("dotenv").config();

const logger = require ("./utils/Logger.js");
const { version } = require ("../package.json");

const client = new Client({ intents, partials });
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
  const commands = readdirSync("./commands/").filter((file) =>
    file.endsWith(".js")
  );
  for (const file of commands) {
    const props = require(`./commands/${file}`);
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
  }

  const eventFiles = readdirSync("./events/").filter((file) =>
    file.endsWith(".js")
  );
  for (const file of eventFiles) {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
  }

  client.on("threadCreate", (thread) => thread.join());

  client.login(process.env.DISCORD_TOKEN);
};

init();
