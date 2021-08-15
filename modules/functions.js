/* eslint-disable no-shadow */
module.exports = (client) => {


  client.permlevel = message => {
    let permlvl = 0;

    const permOrder = client.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

    while (permOrder.length) {
      const currentLevel = permOrder.shift();
      if (message.guild && currentLevel.guildOnly) continue;
      if (currentLevel.check(message)) {
        permlvl = currentLevel.level;
        break;
      }
    }
    return permlvl;
  };

  const defaultSettings = client.config.defaultSettings;

  client.getSettings = (guild) => {
    client.settings.ensure("default", defaultSettings);
    if (!guild) return client.settings.get("default");
    const guildConf = client.settings.get(guild.id) || {};
    return ({ ...client.settings.get("default"), ...guildConf });
  };

  client.awaitReply = async (msg, question, limit = 60000) => {
    const filter = m => m.author.id === msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages({ filter, max: 1, time: limit, errors: ["time"] });
      return collected.first().content;
    }
    catch (e) {
      return false;
    }
  };

  client.clean = async (client, text) => {
    if (text && text.constructor.name == "Promise") {text = await text;}
    if (typeof text !== "string") {text = require("util").inspect(text, { depth: 1 });}

    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));

    text = replaceAll(text, client.token, "[REDACTED]");

    return text;
  };

  client.loadCommand = (commandName) => {
    try {
      const props = require(`../commands/${commandName}`);
      if (props.init) {
        props.init(client);
      }
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
      return false;
    }
    catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  };

  client.unloadCommand = async (commandName) => {
    let command;
    if (client.commands.has(commandName)) {
      command = client.commands.get(commandName);
    }
    else if (client.aliases.has(commandName)) {
      command = client.commands.get(client.aliases.get(commandName));
    }
    if (!command) return `The command \`${commandName}\` doesn't seem to exist, nor is it an alias. Try again!`;

    if (command.shutdown) {
      await command.shutdown(client);
    }
    const mod = require.cache[require.resolve(`../commands/${command.help.name}`)];
    delete require.cache[require.resolve(`../commands/${command.help.name}.js`)];
    for (let i = 0; i < mod.parent.children.length; i++) {
      if (mod.parent.children[i] === mod) {
        mod.parent.children.splice(i, 1);
        break;
      }
    }
    return false;
  };

  Object.defineProperty(String.prototype, "toProperCase", {
    value: function() {
      return this.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    },
  });

  Object.defineProperty(Array.prototype, "random", {
    value: function() {
      return this[Math.floor(Math.random() * this.length)];
    },
  });

  client.wait = require("util").promisify(setTimeout);

  process.on("uncaughtException", (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    client.logger.error(`Uncaught Exception: ${errorMsg}`);
    console.error(err);
  });

  process.on("unhandledRejection", err => {
    client.logger.error(`Unhandled rejection: ${err}`);
    console.error(err);
  });
};

function replaceAll(haystack, needle, replacement) {
  return haystack.split(needle).join(replacement);
}
