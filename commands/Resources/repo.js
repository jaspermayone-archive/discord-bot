//This is the repo command. The invite command sends the bot repo. 

module.exports = {
    name: 'repo',
    guildOnly: false,
    description: "sends the bot repo link",
    execute({ message, roles }) {
        message.channel.send('Heptagram is proud to be open source!');
        message.channel.send('You can find our GitHub repo at https://github.com/Heptagram-Bot/Heptagram');

    }
}