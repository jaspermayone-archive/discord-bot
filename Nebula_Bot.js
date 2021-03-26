const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("Bot online and Ready!");
});

// Set the prefix
const prefix = "!";
client.on("message", (message) => {
  // Exit and stop if it's not there
  if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(prefix + "ping")) {
    message.channel.send("pong!");
  } else
  if (message.content.startsWith(prefix + "foo")) {
    message.channel.send("bar!");
  }
});

client.login("NzgzMDczMDk1MDM2MDQzMjc0.X8Vbpg.sI-Z-oqo9AGcIqGffz91Dfm3woM");