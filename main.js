/* eslint-disable no-unused-vars */
if (Number(process.version.slice(1).split(".")[0]) < 16) throw new Error("Node 16.x or higher is required. Update Node on your system.");

const { Client, Collection } = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");

const config = require("./config.js");

const client = new Client({
  intents: config.intents,
  partials: config.partials,
});

client.config = config;

client.logger = require("./modules/Logger");

require("./modules/functions.js")(client);


client.owners = ["722121621610954773"];


client.commands = new Collection();
client.aliases = new Collection();
client.slashcmds = new Collection();


client.settings = new Enmap({ name: "settings" });

const init = async () => {

  const cmdFiles = await readdir("./commands/");
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
  });

  readdir("./slash", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      const props = require(`./slash/${file}`);
      const commandName = file.split(".")[0];
      client.slashcmds.set(props.commandData.name, props);
    });
  });

  const evtFiles = await readdir("./events/");
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
  });

  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  client.on("threadCreate", (thread) => thread.join());

  client.login(client.config.token);

};

init();
