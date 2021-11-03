if (Number(process.version.slice(1).split(".")[0]) < 16) throw new Error("Node 16.x or higher is required. Update Node on your system.");
require("dotenv").config();

const pjson = require('../package.json');
const { token, IDs, colors, MongoDB, emoji } = require('./config.json');
const { intents, partials, permLevels } = require("./config.js");
const logger = require("./util/logger.js");
// const antiLink = require('./features/anti-link');
// const antiInvite = require('./features/anti-invite');
// const antiSwear = require('./features/anti-swear');

logger.heptagram('Starting Heptagram || Version: ' + pjson.version)

const { Client, Collection } = require('discord.js');
const { readdirSync } = require("fs");
const heptahandler = require('heptagram-handler');
const path = require("path");
const io = require('@pm2/io');

io.init({
  transactions: true,
  http: true,
})

const client = new Client({ intents, partials });

// Aliases, commands and slash commands are put in collections where they can be
// read from, catalogued, listed, etc.
const commands = new Collection();
const aliases = new Collection();
const slashcmds = new Collection();

// Generate a cache of client permissions for pretty perm names in commands.
const levelCache = {};
for (let i = 0; i < permLevels.length; i++) {
  const thisLevel = permLevels[i];
  levelCache[thisLevel.name] = thisLevel.level;
}

// To reduce client pollution we'll create a single container property
// that we can attach everything we need to.
client.container = {
  commands,
  aliases,
  slashcmds,
  levelCache
};

const init = async () => {

  // Here we load **commands** into memory, as a collection, so they're accessible
  // here and everywhere else.
  const commands = readdirSync("./commands/").filter(file => file.endsWith(".js"));
  for (const file of commands) {
    const props = require(`./commands/${file}`);
    logger.log(`Loading Command Directory`, "log");
    client.container.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.container.aliases.set(alias, props.help.name);
    });
  }
  // Then we load events, which will include our message and ready event.
  const eventFiles = readdirSync("./events/").filter(file => file.endsWith(".js"));
  for (const file of eventFiles) {
    const eventName = file.split(".")[0];
    logger.log(`Loading Event Directory.`, "log");
    const event = require(`./events/${file}`);
    // Bind the client to any event, before the existing arguments
    // provided by the discord.js event. 
    client.on(eventName, event.bind(null, client));
  }  

  client.login(token);

};

init();