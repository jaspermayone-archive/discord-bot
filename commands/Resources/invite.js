//This is the invite command. The invite command sends the bot invite. 

module.exports = {
    name: 'invite',
    description: "sends the bot invite link",
    cooldown: 5,
    args: false,
    execute({ message }) {
        message.channel.send('You can invite Heptagram to your server at https://discord.com/oauth2/authorize?client_id=783073095036043274&permissions=8&scope=bot');
    }
}