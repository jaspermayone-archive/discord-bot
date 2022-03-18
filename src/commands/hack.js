const { MessageEmbed } = require("discord.js");
const pjson = require("../../package.json");
const { settings } = require("../utils/settings.js");

exports.run = async (client, message, args, level) => {
  const prefix = settings.get(message.guild.id).prefix;

  const tohack = message.mentions.users.first();
    const msg = await message.channel.send({
      content: `Hacking ${tohack}....`,
    });

    setTimeout(function () {
      msg.edit(`Finding ${tohack}'s Email and Password.....`);
    }, 1000);

    setTimeout(function () {
      msg.edit(`E-Mail: ${tohack}@gmail.com \nPassword: ********`);
    }, 9000);

    setTimeout(function () {
      msg.edit('Finding Other Accounts.....');
    }, 15000);

    setTimeout(function () {
      msg.edit('Setting up Epic Games Account.....');
    }, 21000);

    setTimeout(function () {
      msg.edit('Hacking Epic Games Account......');
    }, 26000);

    setTimeout(function () {
      msg.edit('Hacked Epic Games Account!!');
    }, 31000);

    setTimeout(function () {
      msg.edit('Collecting Info.....');
    }, 35000);

    setTimeout(function () {
      msg.edit('Selling data to FBI....');
    }, 38000);

    setTimeout(function () {
      msg.edit(`Finished Hacking ${tohack}`);
    }, 40000);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User",
};

exports.help = {
  name: "hack",
  category: "Fun",
  description: "Another Fun Command",
  usage: "hack <@user you want to hack>",
};
