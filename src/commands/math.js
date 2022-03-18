const { MessageEmbed } = require("discord.js");
const math = require('mathjs');
const pjson = require("../../package.json");
const { settings } = require("../utils/settings.js");

exports.run = async (client, message, args, level) => {
  const prefix = settings.get(message.guild.id).prefix;

  try {
    const embed = new MessageEmbed()
      .setColor(client.config.colors.heptagram)
      .setTitle('Result')
      .setDescription(`${math.evaluate(args.join(' '))}`)
      .setTimestamp()
      .setFooter({
        text: `Message sent by Heptagram || ${pjson.version}`,
        iconURL: `${client.config.cdn.sqlogo}`,
      });


    message.reply({ embeds: [embed] });
  } catch (error) {
    console.log(error);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
};

exports.help = {
  name: "math",
  category: "Fun",
  description: "Calculates math",
  usage: "math <Equation you want solved>",
};
