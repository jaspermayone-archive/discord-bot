const { MessageEmbed } = require("discord.js");
const schema = require('../../schemas/warnDB')
const { colors } = require("../config/config.json");
const pjson = require("../../package.json");


exports.run = async (client, message, args, level) => {
  //check for permission
  if(!message.member.hasPermission("MANAGE_MESSAGES"))
    {
      return message.channel.reply("You don't have enough permission")
    }
    //get the user from the mention
  let user = message.mentions.users.first()
  if(!user) return message.channel.send("Please mention an user to warn")

  //find or update the user on database
  let data;
  try{
    data = await schema.findOne({
      userId: user.id,
      guildId: message.guild.id
    })
    if(!data){
      data =await schema.create({
        userId: user.id,
        guildId: message.guild.id
      })
  }
  }catch(error){
    console.log(error)
  }

  //check the number of warnings of the user
  const warningembed = new MessageEmbed()
    .setColor(client.config.colors.heptagram)
    .setTitle(`:white_check_mark: **Success!** :white_check_mark:`)
    .setDescription(
      ` **${user.tag}** has a total of ${data.warns} warnings. `
    )
    .setTimestamp()
    .setFooter({
      text: `Message sent by Heptagram || ${pjson.version}`,
      iconURL: `${client.config.cdn.sqlogo}`,

      
    });;
message.channel.send(warningembed);


};



exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator",
};

exports.help = {
  name: "warning",
  category: "Moderation",
  description: "warning users",
  usage: "warning <@user you want to warn> <reason>",
};
