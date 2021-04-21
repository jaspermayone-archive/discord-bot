const discord = require("discord.js");
const figlet = require("figlet"); 
module.exports = {
    name: "ascii",
    category: "fun",
    guildOnly: false,
    description: "Returns provided text in ascii format.",
    execute: async (client, message, args) => {

        let text = args.join(" ");
        if (!text) {
            return message.channel.send(`Please provide text for the ascii conversion!`)
        }
        let maxlen = 20
        if (text.length > 20) {
            return message.channel.send(`Please put text that has 20 characters or less because the conversion won't be good!`)
        }
        figlet(text, function (err, data) {
            message.channel.send(data, {
                code: 'AsciiArt'
            });
        })

    }
};