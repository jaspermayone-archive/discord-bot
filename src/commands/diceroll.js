const { MessageEmbed } = require("discord.js");
const pjson = require("../../package.json");
const { settings } = require("../utils/settings.js");

exports.run = async (client, message, args, level) => {
  const prefix = settings.get(message.guild.id).prefix;

  const embed = new MessageEmbed()
    .setColor(client.config.colors.heptagram)
    .setTitle(`A dice was rolled..`)
    .addFields(
      { name: "Rolled by", value: message.author.username },
      {
        name: "Rolled in:",
        value: `<#${message.channel.id}>`,
      },
      { name: "Rolled at:", value: message.createdAt.toLocaleString() }
    )
    .setTimestamp()
    .setFooter({
      text: `Message sent by Heptagram || ${pjson.version}`,
      iconURL: `${client.config.cdn.sqlogo}`,
    });

  const number = Math.floor(Math.random() * 6);
  const images = [
    "https://upload.wikimedia.org/wikipedia/commons/2/2c/Alea_1.png",
    "https://upload.wikimedia.org/wikipedia/commons/b/b8/Alea_2.png",
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Alea_3.png",
    "https://upload.wikimedia.org/wikipedia/commons/8/8d/Alea_4.png",
    "https://upload.wikimedia.org/wikipedia/commons/5/55/Alea_5.png",
    "https://upload.wikimedia.org/wikipedia/commons/f/f4/Alea_6.png",
  ];

  embed.setImage(images[number]);

  message.reply({ embeds: [embed] });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["dice"],
  permLevel: "User",
};

exports.help = {
  name: "diceroll",
  category: "Fun",
  description: "Rolls a dice for a number 1-6.",
  usage: "diceroll",
};
