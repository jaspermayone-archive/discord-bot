module.exports = {
    name: 'invite',
    guildOnly: false,
    description: "sends the bot invite link",
    category: "Resources",

    execute({ message, roles }) {
       // message.channel.send('You can invite Heptagram to your server at https://discord.com/oauth2/authorize?client_id=783073095036043274&permissions=8&scope=bot');
    message.channel.send('Heptagram is not yet avaible to be invited to servers.')
    }
}