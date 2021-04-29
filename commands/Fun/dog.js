const superagent = require("snekfetch");
const Discord = require('discord.js')
const { prefix, token, roles, MongoDB, serverId, colors } = require('../../config.json');

module.exports = {
  name: "dog",
  category: "fun",
  description: "Sends a random dog image",
  guildOnly: false,

  execute({ message, client, args, roles }) {
      superagent.get('https://nekos.life/api/v2/img/woof')
        .end((err, response) => {
          const lewdembed = new Discord.MessageEmbed()
            .setTitle("<a:dog:730389376210829344>")
            .setImage(response.body.url)
            .setColor(colors.heptagram)
            .setFooter(`🤣WHAT A DOG🤣`)
            .setURL(response.body.url);
          message.channel.send(lewdembed);
        })
    }
  }