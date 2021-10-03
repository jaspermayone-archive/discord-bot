const filter = require("leo-profanity")

module.exports = async function (message) {
    if (message.channel.type === "DM") return // Do not send messages in DMs
    if (message.deleted) return // If the message was deleted, then do not send the user a message
    if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) { // Should be made configurable soon
      if (filter.check(message.content)) {
        message.delete()
        const warning = await message.channel.send(
          `${message.author}, do not use bad words in chat!`
        )
        setTimeout(warning.delete, 4500)
      }
    }
}
