const akaneko = require('akaneko');

module.exports = {
  name: "pussy",
  category: "nsfw",
  description: "NSFW Command",
  execute: async ({ message }) => {
    if (! message.channel.nsfw) {
      return message.channel.send("This channel dosen't support NSFW content.");
    }

    return message.channel.send(await akaneko.nsfw.pussy());
  }
}
