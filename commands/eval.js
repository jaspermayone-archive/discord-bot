const { codeBlock } = require("@discordjs/builders");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const code = args.join(" ");
  try {
    const evaled = eval(code);
    const clean = await client.clean(client, evaled);
    message.channel.send(codeBlock("js", clean));
  }
  catch (err) {
    message.channel.send(codeBlock("xl", `ERROR ${await client.clean(client, err)}`));
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner",
};

exports.help = {
  name: "eval",
  category: "System",
  description: "Evaluates arbitrary javascript.",
  usage: "eval [...code]",
};
