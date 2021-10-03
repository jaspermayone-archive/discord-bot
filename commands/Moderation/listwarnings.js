const mongo = require('../../mongo')
const warnSchema = require('../../schemas/warn-schema')

module.exports = {
    name: 'listwarnings',
	description: 'Lists the warnings of a users',
	category: 'Moderation',
	minArgs: 1,
	maxArgs: 1,
	expectedArgs: "<Target user's @>",
	permissions: ["MANAGE_MESSAGES"],

    callback: async ({ message, args, text }) => {
        const target = message.mentions.users.first()
        if(!target) {
            message.reply('Please specify a user to load the warnings for.')
            return
        }

        const guildId = message.guild.id
        const userId = target.id

        await mongo().then(async mongoose => {
            try{
                const results = await warnSchema.findOne({
                    guildId,
                    userId
                })

                //If user has no warnings:
                if(!results){
                    message.reply("User has no warnings! ")
                    return
                }

                //If user has warnings, display them:
                let reply = `Previous warnings for <@${userId}>: \n\n`
                for(const warning of results.warnings){
                    
                    const {author, timestamp, reason} = warning
                    reply += `By ${author} on  ${new Date(timestamp).toLocaleDateString()} for "${reason}" \n\n `
                }
                message.reply(reply)

            }
            finally{
                mongoose.connection.close()
            }
        })
    }
}