const { MessageEmbed, DiscordAPIError, MessageActionRow } = require('discord.js');
const { det, all } = require('mathjs');
const { colors, cdn, emoji } = require('../../config.json');
const pjson = require('../../package.json');

module.exports = {
    name: 'reaction',
    description: 'Assign Role based on reactions',
    category: 'Resources',
    minArgs: 3,
    maxArgs: -1,
    expectedArgs: " | <title> | <description> | <reaction1 = role1, reaction2 = role2 ....>",
    permissions: ["MANAGE_ROLES"],

    callback: async ({message, args, client}) => {
        
            try{
                // Command usage:
                //!reaction | <title of embed> | <desc of embed> | <reaction1=role1, reaction2=role2 ...>

                const {content} = message

                //If incorrect usage then return
                if (content.split('|').length - 1 != 3){
                    message.reply("Incorrect usage!");
                    return;
                }

                const details = content.split('|')
                
                title = details[1]
                desc = details[2]
                reactionRoles = details[3]

            
                const reactionembed = new MessageEmbed()
                    .setColor(colors.heptagram)
                    .setTitle(`${title}`)
                    .setDescription(`${desc}`)
    
                let messageEmbed = await message.reply({ embeds: [reactionembed] });

                
                //Get all the 'reaction=role' pairs
                const reactions = reactionRoles.split(',')
                const allEmojies = {};

                //Check for each 'reaction=role' pair
                for(const reaction of reactions){
                    if (reaction.includes('=')){
                        const split = reaction.split('=')
                        const emoji = split[0].trim()
                        const role = split[1].trim()

                        if (!message.guild.roles.cache.find( obj => obj.name === role)){
                            message.reply(`The mentioned role: "${role}" does not exist`)
                        }
                        else{ 
                            messageEmbed.react(emoji);
                            allEmojies[emoji] = role;
                        }

                        
                    }
                }


                client.on('messageReactionAdd', async(reaction,user) => {
                    if(reaction.message.partial) await reaction.message.fetch();
                    if(reaction.partial) await reaction.fetch();
                    if(user.bot) return;
                    if(!reaction.message.guild) return;

                    if (reaction.message.channel.id == message.channel.id){
                        for(var emoji in allEmojies){
                            if(reaction.emoji.name === emoji){
                                role = message.guild.roles.cache.find(role => role.name === allEmojies[emoji])
                                await reaction.message.guild.members.cache.get(user.id).roles.add(role)
                            }
                        }
                    }
                    
                    
                });

                client.on('messageReactionRemove', async(reaction,user) => {
                    if(reaction.message.partial) await reaction.message.fetch();
                    if(reaction.partial) await reaction.fetch();
                    if(user.bot) return;
                    if(!reaction.message.guild) return;

                    if(reaction.message.channel.id == message.channel.id){
                        for(var emoji in allEmojies){
                            if(reaction.emoji.name === emoji){
                                role = message.guild.roles.cache.find(role => role.name === allEmojies[emoji])
                                await reaction.message.guild.members.cache.get(user.id).roles.remove(role)
                            }
                        }
                    }              

                });

            }
            catch(error){
                console.log(error);
            }
            
       
    },
}