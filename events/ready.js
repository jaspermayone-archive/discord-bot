const { Team } = require("discord.js");
const pjson = require("../package.json");

module.exports = async client => {
  client.logger.log(`Starting Heptagram || Version:  + ${pjson.version}`, "ready");
  client.logger.log(`Logged in as ${client.user.tag}. Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`, "ready");

  if (!client.application?.owner) await client.application?.fetch();
  if (client.owners.length < 1) {
    if (client.application.owner instanceof Team) {
      client.owners.push(...client.application.owner.members.keys());
    }
    else {
      client.owners.push(client.application.owner.id);
    }
  }
  client.user.setActivity(`${client.settings.get("default").prefix}help`, { type: "WATCHING" });
};
