const { MessageEmbed } = require("discord.js");
const schema = require('../../schemas/warnDB')
const { colors } = require("../config/config.json");
const pjson = require("../../package.json");
const { re } = require("mathjs");

exports.run = async (client, message, args, level) => {
  //check for permission
  if(!message.member.hasPermission("MANAGE_MESSAGES"))
    {
      return message.channel.reply("You don't have enough permission")
    }
    //get the user from the mention
  let user = message.mentions.users.first()
  if(!user) return message.channel.send("Please mention an user to warn")

  let reason;

  //reason to warn the user
  if (args.length === 1) {
  reason = args.slice(1).join(" ");
  } else {
    reason = "No reason provided.";
  }

  //find or update the user on database
  let data;
  try{
    data = await schema.findOne({
      userId: user.id,
      guildId: message.guild.id
    })
    if(!data){
      data =await schema.create({
        uuserId: user.id,
        guildId: message.guild.id
      })
  }
  }catch(error){
    console.log(error)
  }

  //add 1 to the warn on the database everytime user is mentioned
  data.warns += 1;
  data.save();

  //send the data
  const warnembed = new MessageEmbed()
    .setColor(client.config.colors.heptagram)
    .setTitle(`:white_check_mark: **Success!** :white_check_mark:`)
    .setDescription(
      `Successfully warned **${user.tag}** from the server! And has a total of ${data.warns} warnings || Reason: ${reason}.`
    )
    .setTimestamp()
    .setFooter({
      text: `Message sent by Heptagram || ${pjson.version}`,
      iconURL: `${client.config.cdn.sqlogo}`,

      
    });;
message.channel.send(warnembed);

  // const errorembed = new MessageEmbed()
  //   .setColor(client.config.colors.heptagram)
  //   .setTitle(`**Failed**`)
  //   .setDescription(`Failed to warn **${user.tag}**.`)
  //   .setTimestamp()
  //   .setFooter({
  //     text: `Message sent by Heptagram || ${pjson.version}`,
  //     iconURL: `${client.config.cdn.sqlogo}`,
  //   });

//   try {
//     await message.guild.members.warn(user, { reason });
//   } catch (error) {
//     return message.reply({ embeds: [errorembed] });
//   }

//   return message.reply({ embeds: [warnembed] });


};



exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator",
};

exports.help = {
  name: "warn",
  category: "Moderation",
  description: "warn users",
  usage: "warn <@user you want to warn> <reason>",
};
