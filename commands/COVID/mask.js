module.exports = {
    name: 'mask',
    guildOnly: false,
    description: "tells chat to put their mask on",
    execute({ message, args }) {
        message.channel.send('Put your mask on!');
    }
}