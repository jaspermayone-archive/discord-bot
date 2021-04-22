const discord = require("discord.js");
const akaneko = require('akaneko');

module.exports = {
  name: "doujin",
  category: "nsfw",
  description: "NSFW Command",
  
  execute: async ({ Discord, client, message, args }) => { 

    if(message.channel.nsfw) {
      
      return message.channel.send(await akaneko.nsfw.doujin());

    } else {
    
      return message.channel.send("This channel dosen't support nsfw content")
      
    }
  }
}