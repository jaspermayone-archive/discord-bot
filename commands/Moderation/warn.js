const mongo = require('../../mongo')
const warnSchema = require('../../schemas/warn-schema')
//const ban = require('./ban.js')

module.exports = {
    name: 'warn',
	description: 'warns users',
	category: 'Moderation',
	minArgs: 2,
	maxArgs: -1,
	expectedArgs: "<Target user's @> <reason>",
	permissions: ["MANAGE_MESSAGES"],


    callback : async ({ message, args }) => {
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!target){
            message.reply('Please specify someone to warn.')
            return
        }
        args.shift()

        const guildId = message.guild.id
        const userId = target.id
        const reason = args.join(' ')

        const warning = {
            author: message.member.user.tag,
            timestamp: new Date().getTime(),
            reason  
        }


        await mongo().then(async mongoose => {
            try{
                await warnSchema.findOneAndUpdate({
                    guildId,
                    userId
                }, {
                    guildId,
                    userId,
                    $push:{
                        warnings : warning
                    }
                }, {
                    upsert: true
                })


                //For checking the maximum warnings and to ban if max warnings are reached
                const results = await warnSchema.findOne({
                    guildId,
                    userId
                })
                // Ban or kick the user

                if(results.warnings.length >= results.maxWarnings){
                    try{
                        if(results.action === 'ban'){
                            await target.send(`Banned for reaching maximum warnings`)
                            const reason = `Banned for reaching maximum warnings`
                            await message.guild.members.ban(target, {reason});
                            await message.reply(`${target} banned for reaching max warnings`)
                            return
                        }
                        else if(results.action === 'kick'){
                            await target.user.send("Kicked for reaching maximum warnings")
                            const reason = `Kicked for reaching maximum warnings`
                            await message.guild.members.kick(target, { reason });
                            await message.reply(`${target} kicked for reaching max warnings`)
                            return
                        }
                    }
                    catch(error){
                        console.log(error)
                        return message.reply(`Error`)
                    }      
                }
                
            }
            finally{
                mongoose.connection.close()
            }
        })

        await message.reply(`${target} warned for ${reason}`)
        return
    },
};