module.exports = {
    name: 'mask',
    description: "tells chat to put their mask on",
    execute({ message, args, roles }) {
        message.channel.send('Put your mask on!');
    }
}