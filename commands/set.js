const { codeBlock } = require("@discordjs/builders");

exports.run = async (client, message, [action, key, ...value], level) => { // eslint-disable-line no-unused-vars

  const settings = message.settings;
  const defaults = client.settings.get("default");
  const overrides = client.settings.get(message.guild.id);
  const replying = settings.commandReply;
  if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});

  if (action === "edit") {
    if (!key) return message.reply({ content: "Please specify a key to edit", allowedMentions: { repliedUser: (replying === "true") } });

    if (!defaults[key]) return message.reply({ content: "This key does not exist in the settings", allowedMentions: { repliedUser: (replying === "true") } });
    const joinedValue = value.join(" ");

    if (joinedValue.length < 1) return message.reply({ content: "Please specify a new value", allowedMentions: { repliedUser: (replying === "true") } });

    if (joinedValue === settings[key]) return message.reply({ content: "This setting already has that value!", allowedMentions: { repliedUser: (replying === "true") } });

    if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});

    client.settings.set(message.guild.id, joinedValue, key);

    message.reply({ content: `${key} successfully edited to ${joinedValue}`, allowedMentions: { repliedUser: (replying === "true") } });
  }
  else

  if (action === "del" || action === "reset") {
    if (!key) return message.reply({ content: "Please specify a key to reset.", allowedMentions: { repliedUser: (replying === "true") } });
    if (!defaults[key]) return message.reply({ content: "This key does not exist in the settings", allowedMentions: { repliedUser: (replying === "true") } });
    if (!overrides[key]) return message.reply({ content: "This key does not have an override and is already using defaults.", allowedMentions: { repliedUser: (replying === "true") } });

    const response = await client.awaitReply(message, `Are you sure you want to reset ${key} to the default value?`);

    if (["y", "yes"].includes(response.toLowerCase())) {
      client.settings.delete(message.guild.id, key);
      message.reply({ content: `${key} was successfully reset to default.`, allowedMentions: { repliedUser: (replying === "true") } });
    }
    else
    if (["n", "no", "cancel"].includes(response)) {
      message.reply({ content: `Your setting for \`${key}\` remains at \`${settings[key]}\``, allowedMentions: { repliedUser: (replying === "true") } });
    }
  }
  else

  if (action === "get") {
    if (!key) return message.reply({ content: "Please specify a key to view", allowedMentions: { repliedUser: (replying === "true") } });
    if (!defaults[key]) return message.reply({ content: "This key does not exist in the settings", allowedMentions: { repliedUser: (replying === "true") } });
    const isDefault = !overrides[key] ? "\nThis is the default global default value." : "";
    message.reply({ content: `The value of ${key} is currently ${settings[key]}${isDefault}`, allowedMentions: { repliedUser: (replying === "true") } });
  }
  else {
    const array = [];
    Object.entries(settings).forEach(([key, value]) => {
      array.push(`${key}${" ".repeat(20 - key.length)}::  ${value}`);
    });
    await message.channel.send(codeBlock("asciidoc", `= Current Guild Settings =
${array.join("\n")}`));
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["setting", "settings", "conf"],
  permLevel: "Administrator",
};

exports.help = {
  name: "set",
  category: "System",
  description: "View or change settings for your server.",
  usage: "set <view/get/edit> <key> <value>",
};
